import nodemailer from 'nodemailer'
import { randomBytes } from 'node:crypto'
import generateOtpEmail from './otpEmailTemplate.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

/**
 * Generates a unique RFC 2822-compliant Message-ID so every OTP email
 * is treated as a brand-new thread by email clients, preventing newer
 * OTPs from being buried inside an older email thread.
 */
const generateMessageId = () => {
    const unique = randomBytes(16).toString('hex')
    const domain = process.env.EMAIL_USER?.split('@')[1] || 'quizzo.app'
    return `<${unique}.${Date.now()}@${domain}>`
}

const sendOtpEmail = async (email, otp, options = {}) => {
    try {
        const expiryMinutes = options.expiryMinutes || 5

        const { subject, html, text } = generateOtpEmail({
            otp,
            heading: options.heading,
            message: options.message,
            expiryMinutes,
            subject: options.subject
        })

        const mailOptions = {
            from: `"Quizzo" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: options.subject || subject,
            // Unique Message-ID per email — prevents email clients from threading
            // this message under any previous OTP email from Quizzo.
            messageId: generateMessageId(),
            text,
            html
        }

        const info = await transporter.sendMail(mailOptions)
        return info
    } catch (error) {
        throw new Error('Failed to send verification email. Please try again later.')
    }
}

export default sendOtpEmail
