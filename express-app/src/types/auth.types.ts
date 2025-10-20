import {User} from '@prisma/client'

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    success: boolean
    token?: string
    user?: Omit<User, 'password'>
    message: string
}

export interface JWTPayLoad {
    userId: number
    email: string
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: number
                email: string;
            }
        }
    }
}