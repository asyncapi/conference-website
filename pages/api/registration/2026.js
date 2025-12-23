/**
 * API route: /api/registration/2026
 */

function isValidEmail(email) {
  return typeof email === 'string' && /\S+@\S+\.\S+/.test(email);
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    fullName,
    email,
    company,
    role,
    preferredCity,
    attendanceType,
    timezone,
    dietaryAccessibility,
    updatesOptIn,
    sponsorDataSharing,
    notes,
  } = req.body || {};

  // ---- Required field validation ----
  if (!fullName || typeof fullName !== 'string') {
    return res.status(400).json({
      error: 'Full name is required',
    });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      error: 'A valid email address is required',
    });
  }

  // ---- Normalize optional fields ----
  const payload = {
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    company: company?.trim() || '',
    role: role?.trim() || '',
    preferredCity: preferredCity?.trim() || '',
    attendanceType: attendanceType?.trim() || '',
    timezone: timezone?.trim() || '',
    dietaryAccessibility: dietaryAccessibility?.trim() || '',
    notes: notes?.trim() || '',
    updatesOptIn: Boolean(updatesOptIn),
    sponsorDataSharing: Boolean(sponsorDataSharing),
  };

  return res.status(200).json({
    success: true,
    data: payload,
  });
}
