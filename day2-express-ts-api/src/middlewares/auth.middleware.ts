import {Request, Response, NextFunction} from 'express'
import { AppError } from './errorHandler'
import { verifyToken } from '../utils/utils'

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
):void => {
    try{
        // Get token from header
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new AppError('No token provided', 401)
        }

        const token = authHeader.split(' ')[1]

        if(!token){
            throw new AppError('Invalid token format', 401)
        }

        const decoded = verifyToken(token)

        req.user = {
            userId: decoded.userId,
            email: decoded.email
        }

        next()
    } catch(error) {
        if(error instanceof AppError){
            next(error)
        } else {
            next(new AppError('Authentication Failed', 401))
        }
    }
}

export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // Placehloder for when we will be adding roles later
        if(!req.user){
            throw new AppError('Not authorized', 403)
        }
        next()
    }
}