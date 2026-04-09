/**
 * API route: /api/registration/2026
 */
import nodemailer from 'nodemailer';
import { insertRegistration } from "../../../../lib/registration/supabase";

import { isValidEmail } from "../../../../utils/validation";


export default async function handler(req: any, res: any) {
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

    if (!email || !isValidEmail(email.trim())) {
        return res.status(400).json({
            error: 'A valid email address is required',
        });
    }

    // ---- Normalize payload ----
    const payload = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        company: company?.trim() || '',
        role: role?.trim() || '',
        preferredCity: preferredCity?.trim() || '',
        notes: notes?.trim() || '',
        updatesOptIn: Boolean(updatesOptIn),
        sponsorDataSharing: Boolean(sponsorDataSharing),
    };

    const registrationRecord = {
        submitted_at: new Date().toISOString(),
        full_name: payload.fullName,
        email: payload.email,
        company: payload.company,
        role: payload.role,
        preferred_city: payload.preferredCity,
        updates_opt_in: payload.updatesOptIn,
        sponsor_data_sharing: payload.sponsorDataSharing,
        notes: payload.notes,
    };

    try {
        await insertRegistration(registrationRecord);
    } catch (error) {
        console.error('Failed to insert registration row:', error);

        return res.status(500).json({
            error: 'Failed to store registration. Please try again later.',
        });
    }

    // -------- Confirmation Email (optional) --------
    try {
        if (!process.env.ASYNCAPI_EMAIL || !process.env.GOOGLE_APP_PASSWORD) {
            console.warn('Confirmation email skipped: missing SMTP env vars.');
            return res.status(200).json({ success: true });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ASYNCAPI_EMAIL,
                pass: process.env.GOOGLE_APP_PASSWORD,
            },
        });

        const firstName = payload.fullName.split(/\s+/)[0] || payload.fullName;

        await transporter.sendMail({
            from: process.env.ASYNCAPI_EMAIL,
            to: payload.email,
            subject: 'Conference 2026 Registration Received',
            text: `Hi ${firstName},

Thank you for registering. Your registration has been successfully received and confirmed.

We're excited to have you join us and appreciate you taking the time to be part of the event.

In the meantime, feel free to explore the community, connect with others, and keep an eye on your inbox for upcoming announcements.

You can also join our Slack workspace for real-time updates, follow us on social media, or visit our website to stay up to date with the latest news.

If you have any questions or need assistance, don't hesitate to reach out.

Thanks again for registering.

Best regards,

AsyncAPI Conference`,
        });
    } catch (emailError) {
        console.warn('Confirmation email failed:', emailError);
    }

    return res.status(200).json({ success: true });
}
