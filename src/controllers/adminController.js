const login = (req, res) => {
    res.render('pages/admin/login')
}

const forgotPassword = (req, res) => res.render('pages/admin/forgot-password')
const verifyCode = (req, res) => res.render('pages/admin/verify-code')
const changePassword = (req, res) => res.render('pages/admin/change-password')

// const dashboard = (req, res) => res.render('pages/admin/dashboard');
// const quizzes = (req, res) => res.render('pages/admin/list');
// const users = (req, res) => res.render('pages/admin/list');
// const competitions = (req, res) => res.render('pages/admin/list');
// const sales = (req, res) => res.render('pages/admin/sales');
// const quizDetail = (req, res) => res.render('pages/admin/detail');
// const userDetail = (req, res) => res.render('pages/admin/detail');
// const competitionDetail = (req, res) => res.render('pages/admin/detail');
// const form = (req, res) => res.render('pages/admin/form');
// const quizForm = (req, res) => form('quiz', req.path.endsWith('/new') ? 'Create a quiz' : 'Edit a quiz', 'quizzes', req, res);
// const competitionForm = (req, res) => form('competition', req.path.endsWith('/new') ? 'Create a competition' : 'Edit a competition', 'competitions', req, res);

export default {
    login,
    forgotPassword,
    verifyCode,
    changePassword

    // dashboard, 
    // quizzes, 
    // users, 
    // competitions, 
    // sales, 
    // quizDetail, 
    // userDetail, 
    // competitionDetail, 
    // quizForm, 
    // competitionForm, 
};

