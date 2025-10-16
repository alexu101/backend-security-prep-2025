import { Router } from "express";
import { loginSchema, registerSchema } from "../middlewares/authValidation";
import { register, login, getCurrentUser } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router()

// Public routes
router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login);

// Protected routes
router.get('/me', authenticate, getCurrentUser)

export default router