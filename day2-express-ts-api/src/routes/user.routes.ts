import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller";
import { createUserSchema, updateUserSchema, validate } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', authenticate, validate(createUserSchema), createUser,)
router.put('/:id', authenticate, validate(updateUserSchema), updateUser)
router.delete('/:id', authenticate, deleteUser)

export default router