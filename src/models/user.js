import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        select: false
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    profilePicture: {
        type: String
    },

    status: {
        type: String,
        enum: ['active', 'suspended', 'deactivated'],
        default: 'active'
    },

    referralCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },

    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    walletBalance: {
        type: Number,
        default: 0,
        min: 0
    },

    lastLoginAt: {
        type: Date
    }
}, 
    { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User
