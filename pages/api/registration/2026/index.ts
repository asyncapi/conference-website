/**
 * API route: /api/registration/2026
 */
import nodemailer from 'nodemailer';
import { appendRegistrationRow } from "../../../../lib/registration/googleSheets";

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}


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

    // ---- Normalize payload ----
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

    // ---- Prepare Google Sheet row ----
    const rowValues = [
        new Date().toISOString(),        // timestamp
        payload.fullName,
        payload.email,
        payload.company,
        payload.role,
        payload.preferredCity,
        payload.attendanceType,
        payload.timezone,
        payload.dietaryAccessibility,
        payload.updatesOptIn,
        payload.sponsorDataSharing,
        payload.notes,
    ];

    try {
        await appendRegistrationRow(rowValues);

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error('Failed to append registration row:', error);

        return res.status(500).json({
            error: 'Failed to store registration. Please try again later.',
        });
    }

    // -------- Confirmation Email (optional) --------
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ASYNCAPI_EMAIL,
                pass: process.env.GOOGLE_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            to: payload.email,
            subject: 'Conference 2026 Registration Received',
            html: `
        <p>Hi <b>${payload.fullName}</b>,</p>
        <p>Thank you for registering for <b>Conference 2026</b>.</p>
        <p>Your registration has been received successfully.</p>
        <p>Ticket activation details will be shared with you soon.</p>
        <br />
        <p>AsyncAPI Team</p>
      `,
        });
    } catch (emailError) {
        console.warn('Confirmation email failed:', emailError);
    }

    return res.status(200).json({ success: true });
}
