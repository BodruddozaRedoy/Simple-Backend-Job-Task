import express from 'express';
import { getMe, loginUser, registerUser } from '../controller/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/me", authMiddleware, getMe)

export default router