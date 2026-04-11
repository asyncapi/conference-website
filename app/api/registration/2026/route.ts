import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { insertRegistration } from '../../../../lib/registration/supabase';
import { isValidEmail } from '../../../../utils/validation';

export async function POST(req: NextRequest): Promise<NextResponse> {
    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
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
    } = body;

    if (!fullName || typeof fullName !== 'string') {
        return NextResponse.json(
            { error: 'Full name is required' },
            { status: 400 },
        );
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
        return NextResponse.json(
            { error: 'A valid email address is required' },
            { status: 400 },
        );
    }

    const payload = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        company: typeof company === 'string' ? company.trim() : '',
        role: typeof role === 'string' ? role.trim() : '',
        preferredCity: typeof preferredCity === 'string' ? preferredCity.trim() : '',
        notes: typeof notes === 'string' ? notes.trim() : '',
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
        return NextResponse.json(
            { error: 'Failed to store registration. Please try again later.' },
            { status: 500 },
        );
    }

    try {
        if (!process.env.ASYNCAPI_EMAIL || !process.env.GOOGLE_APP_PASSWORD) {
            console.warn('Confirmation email skipped: missing SMTP env vars.');
            return NextResponse.json({ success: true });
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

    return NextResponse.json({ success: true });
}
