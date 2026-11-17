/**
 * Reusable OTP Verification Email Template for Quizzo
 * 
 * Recreates the centered rounded dark container layout (Image 1) with white canvas surrounding.
 * 
 * Palette:
 * - Brand / OTP:     #6C5CE7
 * - Container Box:   #2D2A32 (Centered rounded container)
 * - OTP Container:   #37333D (Inner OTP module)
 * - OTP Border:      #45414B
 * - Heading:         #FFFFFF
 * - Primary Text:    #D8D6DE
 * - Secondary Text:  #9A97A2 / #7D7986
 * - Divider:         #3B3742
 * - Outer Canvas:    #FFFFFF (Clean white surrounding in Gmail)
 */

/**
 * Escapes HTML characters to prevent XSS in email clients
 * @param {string|number} str 
 * @returns {string}
 */
const escapeHtml = (str) => {
    if (str === null || str === undefined) return ''
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

export const generateOtpEmail = ({
    otp,
    heading = 'Verify your email',
    message = 'Use the verification code below to continue. Enter this code in Quizzo to complete your verification.',
    expiryMinutes = 5,
    subject: customSubject
} = {}) => {
    const sanitizedOtp = escapeHtml(otp)
    const sanitizedHeading = escapeHtml(heading)
    const sanitizedMessage = escapeHtml(message)
    const year = new Date().getFullYear()

    const subject = customSubject || 'Quizzo — Your Verification Code'

    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <title>${sanitizedHeading}</title>
    <style type="text/css">
        body, table, td, p, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        body { margin: 0; padding: 0; width: 100% !important; min-width: 100%; background-color: #FFFFFF !important; }
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        u + #body a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
        }
        @media only screen and (max-width: 600px) {
            .outer-padding {
                padding: 16px 8px !important;
            }
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
                border-radius: 12px !important;
            }
            .content-cell {
                padding: 32px 20px !important;
            }
            .otp-container {
                padding: 20px 12px !important;
            }
            .otp-code {
                font-size: 28px !important;
                letter-spacing: 6px !important;
            }
            .footer-left, .footer-right {
                display: block !important;
                width: 100% !important;
                text-align: left !important;
                padding: 3px 0 !important;
            }
            .hide-mobile {
                display: none !important;
            }
        }
    </style>
</head>
<body id="body" bgcolor="#FFFFFF" style="margin: 0; padding: 0; background-color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <!-- Hidden Preheader -->
    <div style="display: none; font-size: 1px; color: #FFFFFF; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Your Quizzo verification code is ${sanitizedOtp}. It expires in ${expiryMinutes} minutes.
    </div>

    <!-- Outer Canvas Table (Surrounding White Space) -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#FFFFFF" style="border-collapse: collapse; background-color: #FFFFFF; margin: 0; padding: 0;">
        <tr>
            <td align="center" class="outer-padding" bgcolor="#FFFFFF" style="padding: 40px 16px; background-color: #FFFFFF;">
                
                <!--[if (gte mso 9)|(IE)]>
                <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="860">
                <tr>
                <td>
                <![endif]-->

                <!-- Centered Dark Charcoal Container Table (Image 1 Layout) -->
                <table role="presentation" class="email-container" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#2D2A32" style="max-width: 860px; width: 100%; background-color: #2D2A32; border-radius: 14px; overflow: hidden; border-collapse: separate; box-sizing: border-box;">
                    <tr>
                        <td class="content-cell" bgcolor="#2D2A32" style="background-color: #2D2A32; border-radius: 14px; padding: 48px 54px; text-align: left;">
                            
                            <!-- Header: Brand Name -->
                            <div style="margin-bottom: 34px;">
                                <span style="font-size: 26px; font-weight: 700; color: #6C5CE7; letter-spacing: -0.3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; display: inline-block;">
                                    Quizzo
                                </span>
                            </div>

                            <!-- Heading -->
                            <h1 style="margin: 0 0 14px 0; font-size: 22px; font-weight: 700; color: #FFFFFF; line-height: 1.35; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                ${sanitizedHeading}
                            </h1>

                            <!-- Description -->
                            <p style="margin: 0 0 32px 0; font-size: 15px; line-height: 1.6; color: #D8D6DE; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                ${sanitizedMessage}
                            </p>

                            <!-- OTP Container -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; margin: 0 0 28px 0;">
                                <tr>
                                    <td class="otp-container" align="center" bgcolor="#37333D" style="background-color: #37333D; border: 1px solid #45414B; border-radius: 10px; padding: 28px 20px; text-align: center;">
                                        
                                        <div style="font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #9A97A2; margin-bottom: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                            YOUR VERIFICATION CODE
                                        </div>

                                        <div class="otp-code" style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #6C5CE7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.2; padding-left: 8px;">
                                            ${sanitizedOtp}
                                        </div>

                                    </td>
                                </tr>
                            </table>

                            <!-- Expiration Notice (Plain text below OTP container) -->
                            <p style="margin: 0 0 14px 0; font-size: 14px; line-height: 1.5; color: #9A97A2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                This code expires in ${expiryMinutes} minutes.
                            </p>

                            <!-- Security Text -->
                            <p style="margin: 0 0 36px 0; font-size: 13px; line-height: 1.6; color: #7D7986; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                For your security, never share this code with anyone. If you didn&#039;t request this code,<br class="hide-mobile" />
                                you can safely ignore this email.
                            </p>

                            <!-- Subtle Horizontal Divider -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin: 0 0 24px 0;">
                                <tr>
                                    <td style="border-top: 1px solid #3B3742; height: 1px; line-height: 1px; font-size: 1px;">&nbsp;</td>
                                </tr>
                            </table>

                            <!-- Footer (Left-aligned brand security, Right-aligned copyright) -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                                <tr>
                                    <td class="footer-left" align="left" valign="middle" style="font-size: 13px; color: #7D7986; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                        Quizzo Account Security
                                    </td>
                                    <td class="footer-right" align="right" valign="middle" style="font-size: 13px; color: #7D7986; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                        &copy; ${year} Quizzo. All rights reserved.
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>

                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->

            </td>
        </tr>
    </table>
</body>
</html>`

    const text = `Quizzo

${heading}

${message}

YOUR VERIFICATION CODE:
${otp}

This code expires in ${expiryMinutes} minutes.

For your security, never share this code with anyone.
If you didn't request this code, you can safely ignore this email.

Quizzo Account Security
© ${year} Quizzo. All rights reserved.`

    return {
        subject,
        html,
        text
    }
}

export default generateOtpEmail
