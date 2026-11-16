import { Router } from 'express';
import { currentUser, login, register } from '../controllers/auth.controller.js';
import authenticate from '../middleware/auth.js';
import asyncHandler from '../utils/async-catch.js';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.get('/me', authenticate, asyncHandler(currentUser));

export default router;
