const getForgotPassword = (req, res) => {
    res.render('pages/password/forgot-password');
}

export const getVerifyCode = (req, res) => {
    res.render('pages/password/verify-code');
}

export const getChangePassword = (req, res) => {
    res.render('pages/password/change-password');
}

export default getForgotPassword
