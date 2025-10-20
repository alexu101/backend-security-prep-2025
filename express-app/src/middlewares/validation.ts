import { NextFunction, Request, Response } from 'express'
import {z, ZodError} from 'zod'

export const createUserSchema = z.object({
    body: z.object({
        name: z.string().min(2, 'Name must be at leaste 2 characters'),
        email: z.string().email('Invalid email format')
    })
})

export const updateUserSchema = z.object({
    body: z.object({
        name: z.string().min(2).optional(),
        email:z.string().email().optional()
    }),
    params: z.object({
        id: z.string().regex(/^\d+$/, 'ID must be a number')
    })
})

// Validation middleware factory
export const validate = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try{
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next()
        } catch (error) {
            if (error instanceof ZodError){
                res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: error.issues.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                })
            }
        }

    }
}