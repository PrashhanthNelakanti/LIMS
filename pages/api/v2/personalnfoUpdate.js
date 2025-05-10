import nodemailer from "nodemailer";

const {connectToDatabase} = require("../../lib/mongodb");
const {ObjectId} = require("mongodb");
const otp =(new Date()).getTime().toString(36);

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'POST': {
            return updateUser(req, res);
        }
    }

    async function updateUser(req, res) {
        try {
            const query = {email: req.body.email};
            req.body.otp=otp;
            sendOtp(req.body.email)
            let {db} = await connectToDatabase();
            const updateVal = {
                $set: req.body
            }
            await db.collection('info').updateOne(query,
                updateVal, {}
            );

            return res.json({
                message: 'User updated successfully',
                success: true,
            });
        } catch (error) {
            return res.json({
                message: new Error(error).message,
                success: false,
            });
        }
    }

}

function sendOtp(to_emailAddress) {
    try {
        const nodemailer = require('nodemailer');
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
            to: to_emailAddress,
            subject: 'OTP',
            html: `<h1>Here is the Otp</h1><p>${otp}</p>`
        };
        new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}