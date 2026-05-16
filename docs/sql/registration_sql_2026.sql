-- Table: conference_registrations_2026
-- Stores attendee registrations for Conference 2026

create table if not exists conference_registrations_2026 (
  id uuid primary key default gen_random_uuid(),

  submitted_at timestamptz not null default now(),

  full_name text not null,
  email text not null,

  company text,
  role text,

  preferred_city text,

  updates_opt_in boolean default false,
  sponsor_data_sharing boolean default false,

  notes text
);

-- Optional: index for faster lookups
create index if not exists conference_registrations_2026_email_idx
on conference_registrations_2026 (lower(email));