import { ErrorResponse } from "../types/express.types"
import { Request, Response, NextFunction } from "express"

// Custom error class
export class AppError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}

// Global error handler middleware
export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error: ', err)

    if (err instanceof AppError){
        const errorResponse: ErrorResponse = {
            success: false,
            error: err.message,
            statusCode: err.statusCode
        }
        res.status(err.statusCode).json(errorResponse)
        return
    }

    // Handle unkown errors

    const errorResponse: ErrorResponse = {
        success: false,
        error: 'Internal Server Error',
        statusCode: 500
    }
    res.status(500).json(errorResponse)
}

//404 handler
export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void =>{
    const error = new AppError(`Route ${req.originalUrl} not found`, 404)
    next(error)
}