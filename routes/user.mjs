import express from 'express';
const router = express.Router();
import userController from '../controllers/user.mjs';

router.post('/', userController.signup); // user signup route

router.post('/login', userController.login); // user login route

export default router;