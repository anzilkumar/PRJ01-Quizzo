const getLogin = (req, res) => {
    res.render('pages/auth/login')
}

const getSignup = (req, res) => {
    res.render('pages/auth/signup')
}

const getHome = (req, res) => {
    res.render('pages/home', {
        currentPath: req.path
    })
}

const getContest = (req, res) => {
    res.render('pages/contest', {
        currentPath: req.path
    })
}

const getQuiz = (req, res) => {
    res.render('pages/quiz', {
        currentPath: req.path
    })
}

export default {
    getLogin,
    getSignup,
    getHome,
    getContest,
    getQuiz
}
