import User from '../models/user.js'

const findByEmail = (email) => {
    return User.findOne({ email: email.trim().toLowerCase() })
}

const findByEmailWithPassword = (email) => {
    return User.findOne({ email: email.trim().toLowerCase() }).select('+password')
}

const findById = (userId) => {
    return User.findById(userId)
}

const createUser = (userData) => {
    return User.create(userData)
}

const updateUser = (userId, updateData) => {
    return User.findByIdAndUpdate( userId, { $set: updateData }, { new: true, runValidators: true })
}

const updateLastLogin = (userId) => {
    return User.findByIdAndUpdate( userId, { $set: { lastLoginAt: new Date() } }, { new: true })
}

const findByReferralCode = (referralCode) => {
    return User.findOne({ referralCode: referralCode.trim().toUpperCase() })
}

export default {
    findByEmail,
    findByEmailWithPassword,
    findById,
    createUser,
    updateUser,
    updateLastLogin,
    findByReferralCode
}