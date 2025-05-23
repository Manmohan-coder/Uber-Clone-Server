import express from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { registerUser } from '../controllers/user.controller.js';
// import { createUser } from './../services/user.service';

router.post('/register',
    [body('email').isEmail().withMessage('Invalid email format'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')], registerUser
    // (req, res) => {
    //     // Handle registration logic here
    //     res.status(200).json({ message: 'User registered successfully' });
    // }
);


export default router;
