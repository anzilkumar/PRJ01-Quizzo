import { Router } from 'express'

import authRoutes from './authRoutes.js';
import passwordRoutes from './passwordRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = Router()

router.use('/', authRoutes)
router.use('/', passwordRoutes)
router.use('/admin', adminRoutes)

export default router;
