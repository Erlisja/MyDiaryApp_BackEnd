import express from 'express';
const router = express.Router();
import userController from '../controllers/user.mjs';
 import authenticationToken from '../middleware/authenticationToken.js';

router.post('/', userController.create); // user signup route

router.post('/login', userController.login); // user login route

router.put('/update', authenticationToken, userController.update); // user update route 

export default router;