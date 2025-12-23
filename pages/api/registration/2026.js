/**
 * API route: /api/registration/2026
 * Allows only POST requests. Returns 405 for others.
 */
export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  return res.status(200).json({ success: true });
}
