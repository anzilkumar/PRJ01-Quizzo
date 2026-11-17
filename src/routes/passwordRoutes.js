import { Router } from 'express'

import getForgotPassword, { getVerifyCode, getChangePassword } from '../controllers/passwordController.js';

const router = Router();

router.get('/forgot-password', getForgotPassword);
router.get('/verify-code', getVerifyCode);
router.get('/change-password', getChangePassword);

export default router;
