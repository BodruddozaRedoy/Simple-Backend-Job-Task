import express from 'express';
import { getAllUser, getMe, loginUser, registerUser } from '../controller/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/me", authMiddleware, getMe)
router.get("/all-users", getAllUser)

export default router