const sheetId = process.env.REGISTRATION_SHEET_ID?.trim();
const tab = process.env.REGISTRATION_TAB?.trim();

if (!sheetId || !tab) {
  if (process.env.NODE_ENV !== 'production') {
    const missing = [];
    if (!sheetId) missing.push('REGISTRATION_2026_SHEET_ID');
    if (!tab) missing.push('REGISTRATION_2026_TAB');
    throw new Error(
      `Missing environment variables for registration2026: ${missing.join(', ')}`
    );
  }
}

export const REGISTRATION_SHEET_ID = sheetId;
export const REGISTRATION_TAB = tab;
