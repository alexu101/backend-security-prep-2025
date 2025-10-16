import bcrypt from 'bcryptjs'
import jwt, { SignOptions } from 'jsonwebtoken'
import { JWTPayLoad } from '../types/auth.types'

const JWT_SECRET = (process.env.JWT_SECRET || 'fallback-secret') as string
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as string
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10')

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

// Compare password with hash
export const comparePassword = async (
    password: string,
    hashedPassword: string,
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
}

// Generate JWT token
export const generateToken = (payload: JWTPayLoad): string => {
    const options: SignOptions = {
        expiresIn: JWT_EXPIRES_IN as any
    }
    return jwt.sign(payload, JWT_SECRET, options)
}

//Verify JWT token
export const verifyToken = (token: string): JWTPayLoad => {
    try{
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayLoad;
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token')
    }
}