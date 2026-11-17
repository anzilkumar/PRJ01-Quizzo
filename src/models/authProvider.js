import mongoose from 'mongoose'

const authProviderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    provider: {
        type: String,
        required: true,
        enum: ['google'],
        lowercase: true,
        trim: true
    },

    providerUserId: {
        type: String,
        required: true,
        trim: true
    },

    providerEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }
}, 
    { timestamps: true })

authProviderSchema.index({ provider: 1, providerUserId: 1 }, { unique: true })
authProviderSchema.index({ userId: 1, provider: 1 }, { unique: true })

const AuthProvider = mongoose.model('AuthProvider', authProviderSchema)

export default AuthProvider
