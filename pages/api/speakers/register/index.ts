import type { NextApiRequest, NextApiResponse } from 'next';
import { auth, sheets } from '@googleapis/sheets';
import nodemailer from 'nodemailer';
import { LRUCache } from 'lru-cache';
import { z } from 'zod';

// Validation schema for CFP submission

const cfpSchema = z.object({
  Fullname: z.string().min(2),
  Email: z.string().email(),
  Bio: z.string().min(10),
  Social: z.string().optional(),
  Title: z.string().min(3),
  Description: z.string().min(20),
  Format: z.string().min(2),
  Level: z.string().min(2),
  AdditionalInfo: z.string().optional(),
});

// Simple in-memory rate limiter
const rateLimit = new LRUCache<string, number>({
  max: 500,
  ttl: 1000 * 60,
});



// Apply basic rate limiting per IP
function applyRateLimit(req: NextApiRequest, res: NextApiResponse) {
  const forwarded = req.headers['x-forwarded-for'] as string | undefined;

  const ip =
    forwarded?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    '';

  if (!ip) return;
  if (rateLimit.get(ip)) {
    res.status(429).json({ message: 'Too many requests. Please try again later.' });
    throw new Error('Rate limited');
  }

  rateLimit.set(ip, Date.now());
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res
        .status(405)
        .json({ message: 'Method Not Allowed. Only POST requests are supported.' });
    }

    //  Apply rate limit
    applyRateLimit(req, res);

      // Validate request body
    const parseResult = cfpSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        message: 'Invalid submission data',
        errors: parseResult.error.format(),
      });
    }

    const submission = parseResult.data;

    
    // Parse Google credentials safely
    let credentials: Record<string, unknown> | undefined;

    if (process.env.GOOGLE_SHEET_SERVICE_ACCOUNT) {
      try {
        credentials = JSON.parse(process.env.GOOGLE_SHEET_SERVICE_ACCOUNT);
      } catch (err) {
        console.error('Invalid GOOGLE_SHEET_SERVICE_ACCOUNT JSON:', err);

        return res.status(500).json({
          message: 'Invalid Google credentials configuration',
        });
      }
    }

    // Initialize Google Sheets client
    const authClient = new auth.GoogleAuth({
      keyFile: process.env.GSHEET_KEY_FILE,
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const googleSheets = sheets({
      version: 'v4',
      auth: authClient,
    });

    // Append submission to Google Sheet
    await googleSheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Sheet2',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            submission.Fullname,
            submission.Email,
            submission.Bio,
            submission.Social,
            submission.Title,
            submission.Description,
            submission.Level,
            submission.Format,
            submission.AdditionalInfo,
          ],
        ],
      },
    });


    // Configure mail transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.ASYNCAPI_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });


    // Send confirmation email
    try {
      await transporter.sendMail({
        from: `"AsyncAPI Conference" <${process.env.ASYNCAPI_EMAIL}>`,
        to: submission.Email,
        subject: 'Confirmation for your talk registration',
        html: `
          <p>Thank you for submitting your proposal to the <b>AsyncAPI Online Edition</b>.</p>
          <p>This email confirms that we have received it.</p>
          <p>You will receive a status update after the Call for Speakers closes.</p>
        `,
      });
    } catch (mailError) {
      console.error('Email sending error:', mailError);

      // Do not fail entire request if email fails
      return res.status(200).json({
        message:
          'Submission received successfully, but confirmation email could not be sent.',
      });
    }

    // Success response
    return res.status(200).json({
      message: 'Submission received successfully',
    });
  } catch (err) {
    console.error('CFP handler error:', err);

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}
