import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import userRepository from '../repositories/userRepository.js'

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const googleId = profile.id
                const email = profile.emails?.[0]?.value?.trim().toLowerCase()
                const name = profile.displayName?.trim()
                const profilePicture = profile.photos?.[0]?.value

                if (!googleId || !email || !name) {
                    return done(null, false)
                }

                let user = await userRepository.findUserByGoogleId(googleId)

                if (user) {
                    user.lastLoginAt = new Date()
                    await user.save()

                    return done(null, user)
                }

                const existingUser = await userRepository.findUserByEmail(email)

                if (existingUser) {
                    // Do not automatically link an existing account.
                    return done(null, false)
                }

                const referralCode = await userRepository.generateReferralCode()

                user = await userRepository.createUser({
                    googleId,
                    name,
                    email,
                    profilePicture,
                    isEmailVerified: true,
                    referralCode,
                    lastLoginAt: new Date()
                })

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

export default passport