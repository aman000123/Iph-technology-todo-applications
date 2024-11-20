import { Router } from 'express';

import { CreateUserCtrl, UserLoginCtrl } from '../controllers/authController.js'
const router = Router();

router.post('/signup', CreateUserCtrl);
router.post('/login', UserLoginCtrl)


export default router
