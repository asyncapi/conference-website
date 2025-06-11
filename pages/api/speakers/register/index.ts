import { NextApiRequest, NextApiResponse } from 'next';
import { auth, sheets } from '@googleapis/sheets';
import nodemailer from 'nodemailer';
import { CfpForm } from '../../../../types/types';
import { JWT } from 'google-auth-library';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const authClient = new auth.GoogleAuth({
      // keyFile: './credentials.json', // uncomment this line to run locally
      credentials: JSON.parse(process.env.GOOGLE_SHEET_SERVICE_ACCOUNT!), // comment this line to run locally
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = (await authClient.getClient()) as JWT;

    const googleSheets = sheets({
      version: 'v4',
      auth: client,
    });

    const submission: CfpForm = req.body;

    let response = await googleSheets.spreadsheets.values.append({
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

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // configure sender service here
      port: 465,
      secure: true,
      auth: {
        user: process.env.ASYNCAPI_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      to: submission.Email, // list of receivers
      subject: 'Confirmation for registeration of your talk with AsyncAPI!', // Subject line
      html: "<p>Thank you for submitting your proposal to the <b>AsyncAPI Online Edition</b>.</p> <p> This email confirms that we have received it.</p> <p>You'll receive a status update a week after we close the <b> Call for Speakers</b>.</p><br>",
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
}
