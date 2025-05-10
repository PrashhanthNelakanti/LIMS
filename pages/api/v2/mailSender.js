export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return sendOtp(req, res);
        }
    }
}

async function sendOtp(req, res) {
    try {
        const nodemailer = require('nodemailer');

        const toAdd = req.body;
        console.log(await toAdd)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PWD
            },
            secure: true,
        });
        var mailOptions = {
            from: process.env.EMAIL,
            to: toAdd,
            subject: 'OTP',
            html: `<h1>Here is the Otp</h1>`
        };
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

        return res.json({
            message: `Post added successfully`,
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}



