import {Request, Response} from 'express'
import {User, ApiResponse} from '../types/express.types'

let users: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date()
    },
    {
        id: 2,
        name: 'Scarlett Johanson',
        email: 'scarlett@example.com',
        createdAt: new Date()
    },
    {
        id: 3,
        name: 'Dave Chapelle',
        email: 'dave@example.com',
        createdAt: new Date()
    }
]

//GET all users
export const getAllUsers = (req: Request, res: Response): void => {
    const response: ApiResponse<User[]> = {
        success: true,
        data: users
    }
    res.json(response)
}

//GET user by ID
export const getUserById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id!)

    const user = users.find(u => u.id === id)

    if(!user){
        res.status(404).json({
            success:false,
            error: 'User not found'
        })
    }

    const response: ApiResponse<User> = {
        success: true,
        data: user!
    }

    res.json(response);
}

// CREATE new user
export const createUser = (req: Request, res: Response): void =>{
    const {name, email} = req.body

    if (!name || !email){
        res.status(400).json({
            success: false,
            error: 'Name and email are required'
        })
    }

    const newUser: User = {
        id: users.length + 1,
        name,
        email,
        createdAt: new Date()
    }

    users.push(newUser);

    const response: ApiResponse<User> = {
        success: true,
        data: newUser,
        message: 'User successfully created'
    }

    res.json(response)
}

// DELETE user
export const deleteUser = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id!)

    if (!users.find(u => u.id === id)){
        res.status(404).json({
            success:false,
            error: 'User not found'
        })
    }

    const newUsersList: User[] = users.filter(u => u.id !== id)

    users = newUsersList

    const response: ApiResponse<User[]> = {
        success: true,
        data: users,
        message: 'User deleted successfuly'
    }

    res.json(response)
}

//UPDATE user
export const updateUser = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id!)
    type UserBody = {
        name?: string,
        email?: string
    }
    const {name, email}: UserBody = req.body

    if(!users.find(u => u.id))
        res.status(404).json({
            success: false,
            error: 'User not found'
        })

    const userIndex = users.findIndex(u => u.id === id);
    const currentUser = users[userIndex]

    if (!currentUser){
        res.status(404).json({
            success:false,
            error: 'User not found'
        })
        return
    }

    users[userIndex] = {
        id: currentUser.id,
        name: name || currentUser.name,
        email: email || currentUser.email,
        createdAt: currentUser.createdAt
    };

    const response: ApiResponse<User> = {
        success: true,
        data: users[userIndex],
        message: 'User updated successfully'
    };
    res.json(response);
}