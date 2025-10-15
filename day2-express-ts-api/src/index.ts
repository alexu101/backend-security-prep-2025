import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import {config} from './config'
import userRoutes from './routes/user.routes'
import { requestLogger } from './middlewares/logger'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler'

dotenv.config()

const app: Express = express()
const PORT = config.port

// Middleware
app.use(express.json());
app.use(requestLogger);

app.use('/api/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to Express + TypeScript API',
        timestamp: new Date()
    })
})

// Healt check
app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: 'OK',
        uptime: process.uptime(),
        timeStamp: Date.now()
    })
})

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
    console.log(`Environment: ${config.nodeEnv}`)
})
