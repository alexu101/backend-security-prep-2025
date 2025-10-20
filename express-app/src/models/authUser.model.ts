import { User } from "@prisma/client";
import prisma from "../config/database";

export const findUserByEmail = async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: {email: email.toLowerCase()}
    })
}

export const findUserById = async (id: number): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: {id: id}
    })
}

export const createAuthUser = async (
    name: string,
    email: string,
    hashedPassword: string
): Promise<User> => {
    return await prisma.user.create({
        data:{
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        }
    })
}

export const getAllAuthUsers = async (): Promise<User[]> => {
    return await prisma.user.findMany({
        orderBy: {createdAt: 'desc'}
    })
}

export const updateAuthUser = async (
    id: number,
    data: {name?: string, email?: string}
): Promise<User> => {
    return await prisma.user.update({
        where: {id},
        data: {
            ...(data.name && {name: data.name}),
            ...(data.email && {email: data.email})
        }
    })
}

export const deleteAuthUser = async (id: number): Promise<User> => {
    return await prisma.user.delete({
        where: {id}
    })
}