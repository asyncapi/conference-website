import { auth, sheets } from '@googleapis/sheets';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const authClient = new auth.GoogleAuth({
      // keyFile: './credentials.json', // uncomment this line to run locally
      credentials: JSON.parse(process.env.GOOGLE_SHEET_SERVICE_ACCOUNT || ''), // comment this line to run locally
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Obtain the auth client
    const client = await authClient.getClient();

    // Instantiate the Google Sheets API client
    const googleSheets = sheets({ version: 'v4', auth: client as any});

    const response = await googleSheets.spreadsheets.values.append({
      auth: authClient as any,
      spreadsheetId: process.env.SHEET_ID || " ",
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[req.body.Fullname,req.body.Email,req.body.Bio,req.body.Social,req.body.Title,
            req.body.Description,req.body.Level,req.body.Format,req.body.AdditionalInfo]]
    }
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

    const info: SentMessageInfo = await transporter.sendMail({
      to: req.body.Email, // list of receivers
      subject: 'Confirmation for registration of your talk with AsyncAPI!', // Subject line
      html: `
        <p>Thank you for submitting your proposal to the <b>AsyncAPI Online Edition</b>.</p>
        <p>This email confirms that we have received it.</p>
        <p>You'll receive a status update a week after we close the <b>Call for Speakers</b>.</p><br>
      `,
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
