import { GraphQLError } from "graphql";
import { createAuthUser, findUserByEmail, findUserById, getAllAuthUsers } from "../models/authUser.model"
import { comparePassword, generateToken, hashPassword } from "../utils/utils";

export const resolvers = {
    Query: {
        users: async() => {
            const users = await getAllAuthUsers();
            return users.map(({password, ...user}) => user)
        },
        user: async(_: any, {id}: {id: number}) => {
            const user = await findUserById(id)
            if (!user){
                throw new GraphQLError('User not found', {
                    extensions: {code: 'NOT_FOUND'}
                })
            }
            const {password, ...userWithoutPassword} = user
            return userWithoutPassword
        },
        me: async(_: any, __:any, context: any) =>{
            if(!context.user){
                throw new GraphQLError('Not authenticated', {
                    extensions: {code: 'UNAUTHENTICATED'}
                })
            }
            const user = await findUserById(context.user.userId)
            if(!user){
                throw new GraphQLError('User not found',{
                    extensions: {code: 'NOT_FOUND'}
                })
            }
            const {password, ...userWithoutPassword} = user
            return userWithoutPassword
        }
    },

    Mutation: {
        register: async(parent: any, {name, email, password}: {name: string, email: string, password: string}) => {
            const existingUser = await findUserByEmail(email)
            if (existingUser){
                throw new GraphQLError('User already exists',{
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const hashedPassword = await hashPassword(password)
            const newUser = await createAuthUser(name, email, hashedPassword)
            const token = generateToken({userId: newUser.id, email: newUser.email})

            const {password:_ , ...userWithoutPassword} = newUser

            return {
                token,
                user: userWithoutPassword
            }
        },

        login: async(parent: any, {email, password}: {email: string, password: string}) => {
            const existingUser = await findUserByEmail(email)
            if(!existingUser){
                throw new GraphQLError('Bad user credentials', {extensions:{ code: 'UNAUTHENTICATED'}})
            }

            const passwordMatch = comparePassword(password, existingUser.password)
            if(!passwordMatch){
                throw new GraphQLError('Bad user credentials', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const token = generateToken({userId: existingUser.id, email: existingUser.email})
            const {password: _, ...userWithoutPassowrd} = existingUser

            return {
                token,
                user: userWithoutPassowrd
            }
        }
    }
}