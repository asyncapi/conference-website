import { createClient } from '@supabase/supabase-js';
import {
  REGISTRATION_2026_TABLE,
  REGISTRATION_SUPABASE_SERVICE_ROLE_KEY,
  REGISTRATION_SUPABASE_URL,
} from './config';

export type RegistrationInsertRecord = {
  submitted_at?: string;
  full_name: string;
  email: string;
  company: string;
  role: string;
  preferred_city: string;
  updates_opt_in: boolean;
  sponsor_data_sharing: boolean;
  notes: string;
};

function getSupabaseClient() {
  if (!REGISTRATION_SUPABASE_URL || !REGISTRATION_SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Registration 2026 Supabase config not set');
  }

  return createClient(
    REGISTRATION_SUPABASE_URL,
    REGISTRATION_SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export async function insertRegistration(record: RegistrationInsertRecord) {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from(REGISTRATION_2026_TABLE)
    .insert(record);

  if (error) {
    throw error;
  }
}
