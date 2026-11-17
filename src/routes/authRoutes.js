import { Router } from 'express'

import authController from '../controllers/authController.js';

const router = Router();

router.get('/', authController.getLogin);
router.get('/signup', authController.getSignup);
router.get('/home', authController.getHome);
router.get('/contest', authController.getContest);
router.get('/quiz', authController.getQuiz);

export default router;
