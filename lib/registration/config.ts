const supabaseUrl = process.env.SUPABASE_URL?.trim();
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const registrationTable = process.env.REGISTRATION_2026_TABLE?.trim() || 'conference_registrations_2026';

if (!supabaseUrl || !supabaseServiceRoleKey) {
  if (process.env.NODE_ENV !== 'production') {
    const missing = [];
    if (!supabaseUrl) missing.push('SUPABASE_URL');
    if (!supabaseServiceRoleKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
    throw new Error(
      `Missing environment variables for registration2026: ${missing.join(', ')}`
    );
  }
}

export const REGISTRATION_SUPABASE_URL = supabaseUrl;
export const REGISTRATION_SUPABASE_SERVICE_ROLE_KEY = supabaseServiceRoleKey;
export const REGISTRATION_2026_TABLE = registrationTable;
