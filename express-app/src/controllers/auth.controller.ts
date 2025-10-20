import { Request, Response, NextFunction } from "express";
import { createAuthUser, findUserByEmail} from "../models/authUser.model";
import { comparePassword, generateToken, hashPassword } from "../utils/utils";
import { AuthResponse} from "../types/auth.types";
import { AppError } from "../middlewares/errorHandler";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const {name, email, password} = req.body

        const existingUser = await findUserByEmail(email)
        if(existingUser){
            throw new AppError('User with this email already exists', 400)
        }

        const hashedPassword = await hashPassword(password)
        const newUser = await createAuthUser(name, email, hashedPassword)

        const token = generateToken({
            userId: newUser.id,
            email: newUser.email
        })

        const response: AuthResponse = {
            success: true,
            token,
            user: newUser,
            message: 'User registered successfully'
        }

        res.status(201).json(response)
    } catch(error) {
        if (error instanceof Error){
            console.error('Database error: ', error.message)
            throw new AppError('Registration failed', 500)
        }
        next(error)
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const {email, password} = req.body

        const user = await findUserByEmail(email)
        if(!user){
            throw new AppError('Invalid credentials', 401)
        }

        const isPasswordValid = await comparePassword(password, user.password)
        if (!isPasswordValid){
            throw new AppError('Invalid crednetials', 401)
        }

        const token = generateToken({
            userId: user.id,
            email: user.email
        })

        const response: AuthResponse = {
            success: true,
            user: user,
            message: 'Logged in successfuly',
            token
        }

        res.status(201).json(response)
    } catch (error){
        next(error)
    }
}

export const getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        if(!req.user){
            throw new AppError('User not authorized', 402)
        }

        const currentUser = await findUserByEmail(req.user.email)
        if (!currentUser){
            throw new AppError('User not found', 404)
        }

        const response = {
            success: true,
            data: currentUser
        }

        res.status(201).json(response)
    } catch (error) {
        next(error);
    }
}