import { AuthUser } from "../types/auth.types";

// In memory DB (to be replaced with a real one)
let authUsers: AuthUser[] = []
let nextId = 1;

export const findUserByEmail = (email: string): AuthUser | undefined => {
    return authUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
}

export const findUserById = (id: number): AuthUser | undefined => {
    return authUsers.find(u => u.id === id)
}

export const createAuthUser = (
    name: string,
    email: string,
    hashedPassword: string
): AuthUser => {
    const newUser: AuthUser = {
        id: nextId++,
        name,
        email,
        password: hashedPassword,
        createdAt: new Date()
    }

    authUsers.push(newUser);

    return newUser
}

export const getAllAuthUsers = (): AuthUser[] => authUsers

export const sanitizeUser = (user: AuthUser) => {
    const {password, ...userWithoutPassword} = user
    return userWithoutPassword
}