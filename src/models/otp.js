import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default : null
    },

    otpHash: {
        type: String,
        required: true
    },

    purpose: {
        type: String,
        required: true,
        enum: ['signup', 'forgot-password', 'update-password']
    },

    expiresAt: {
        type: Date,
        required: true
    },

    lastResendAt: {
        type: Date,
        default: null
    },

    attempts: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },

    isUsed: {
        type: Boolean,
        default: false
    }

},
    { timestamps: true })

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })
otpSchema.index({ email: 1, purpose: 1 }, {unique: true, partialFilterExpression: { isUsed: false }, name: 'one_unused_otp_per_email_purpose' })

const Otp = mongoose.model('Otp', otpSchema);

export default Otp