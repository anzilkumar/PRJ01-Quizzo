import { Router } from 'express'

import adminController from '../controllers/adminController.js'

const router = Router()

router.get('/', adminController.login)
router.get('/forgot-password', adminController.forgotPassword)
router.get('/verify-code', adminController.verifyCode)
router.get('/change-password', adminController.changePassword)

// router.get('/', adminController.dashboard)
// router.get('/quizzes', adminController.quizzes)
// router.get('/quizzes/new', adminController.quizForm)
// router.get('/quizzes/:id/edit', adminController.quizForm)
// router.get('/quizzes/:id', adminController.quizDetail)
// router.get('/users', adminController.users)
// router.get('/users/:id', adminController.userDetail)
// router.get('/competitions', adminController.competitions)
// router.get('/competitions/new', adminController.competitionForm)
// router.get('/competitions/:id/edit', adminController.competitionForm)
// router.get('/competitions/:id', adminController.competitionDetail)
// router.get('/sales', adminController.sales)

export default router
