/**
 * Registration 2026 configuration helper.
 * Reads environment variables and exports them as constants.
 * Throws in non-production environments if any required value is missing.
 */

const sheetId = process.env.REGISTRATION_2026_SHEET_ID?.trim();
const tab = process.env.REGISTRATION_2026_TAB?.trim();

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

export const REGISTRATION_2026_SHEET_ID = sheetId;
export const REGISTRATION_2026_TAB = tab;
