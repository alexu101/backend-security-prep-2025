import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller";
import { createUserSchema, updateUserSchema, validate } from "../middlewares/validation";

const router = Router();

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', validate(createUserSchema), createUser,)
router.put('/:id', validate(updateUserSchema), updateUser)
router.delete('/:id', deleteUser)

export default router