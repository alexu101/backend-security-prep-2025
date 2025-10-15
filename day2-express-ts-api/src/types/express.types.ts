export interface User {
    id: number
    name: string
    email: string
    createdAt: Date
}

export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

export interface ErrorResponse {
    success: false
    error: string
    statusCode: number
}