import express from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { registerUser, loginUser } from '../controllers/user.controller.js';
// import { createUser } from './../services/user.service';

router.post('/register',
    [body('email').isEmail().withMessage('Invalid email format'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')], loginUser);

export default router;
