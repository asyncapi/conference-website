import { google } from 'googleapis';
import { REGISTRATION_SHEET_ID, REGISTRATION_TAB } from './config';

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
   credentials: JSON.parse(process.env.GOOGLE_SHEET_SERVICE_ACCOUNT!),
   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client as any });
}

export async function appendRegistrationRow(rowValues: string[]) {
  if (!REGISTRATION_SHEET_ID || !REGISTRATION_TAB) {
    throw new Error('Registration 2026 spreadsheet config not set');
  }

  const sheets = await getSheetsClient();

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: REGISTRATION_SHEET_ID,
    range: REGISTRATION_TAB,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      // rowValues should be an array of cell values for a single row
      values: [rowValues],
    },
  });

  return res.data;
}
