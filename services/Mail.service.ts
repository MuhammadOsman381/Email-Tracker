import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendEmail = async (
    email: string,
    message: string
) => {
    try {
        await transporter.sendMail({
            from: `Email tracking system`,
            to: email,
            subject: "Email tracking result!",
            html: message,
        });
    } catch (error) {
        console.error("Email sending failed:", error);
    }
};