"use server"

import { auth, sheets } from '@googleapis/sheets'
import nodemailer from "nodemailer"
import path from "path"
export default async function handler(req, res) {

    const authClient = new auth.GoogleAuth({
        keyFile: './credentials.json',
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets'
        ],
    });

    const client = await authClient.getClient();

    const googleSheets = sheets({
        version: 'v4',
        auth: client
    });

    let a = await googleSheets.spreadsheets.values.append({
        auth: authClient,
        spreadsheetId: process.env.SHEET_ID,
        range: 'Sheet1',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [[req.body.Fullname,req.body.Email,req.body.Bio,req.body.Social,req.body.Title,
                req.body.Description,req.body.Level,req.body.Format,req.body.AdditionalInfo]]
        }
    });



        const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // configure sender service here
        port: 465,
        secure: true, 
        auth: {
            user: process.env.SENDER_MAIL,
            pass: process.env.APP_PASSWORD,
        },
        });

        const info = await transporter.sendMail({
            to: req.body.Email, // list of receivers
            subject: "Confirmation for registeration of your talk with AsyncAPI!", // Subject line
            html: "<p>Thank you for submitting your proposal to the <b>AsyncAPI Online Edition</b>.</p> <p> This email confirms that we have received it.</p><br> <p>You'll receive a status update a week after we close the <b> Call for Speakers</b>.</p><br>",
        });


    res.json(a);
}