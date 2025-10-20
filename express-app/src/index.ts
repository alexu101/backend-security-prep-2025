// import express, { Express, Request, Response } from 'express'
// import dotenv from 'dotenv'
// import {config} from './config'
// import userRoutes from './routes/user.routes'
// import authRoutes from './routes/auth.routes'
// import { requestLogger } from './middlewares/logger'
// import { errorHandler, notFoundHandler } from './middlewares/errorHandler'
// import { ApolloServer } from '@apollo/server'
// import { resolvers } from './graphql/resolvers'
// import { typeDefs } from './graphql/schema'
// import { verifyToken } from './utils/utils'
// import { expressMiddleware } from '@apollo/server/express4'
// import cors from 'cors'

// dotenv.config()

// const app: Express = express()
// const PORT = config.port

// // Middleware
// app.use(express.json());
// app.use(requestLogger);

// app.use('/api/users', userRoutes)
// app.use('/api/auth', authRoutes)

// const apolloServer = new ApolloServer({
//     typeDefs,
//     resolvers
// });

// (async () => {
//     await apolloServer.start()
// })()

// app.use(
//     '/graphql',
//     cors<cors.CorsRequest>(),
//     express.json(),
//     expressMiddleware(apolloServer, {
//         context: async ({req, res}) => {
//             const authHeader = req.headers.authorization || ''
//             if(authHeader.startsWith('Bearer ')){
//                 try{
//                     const token = authHeader.split(' ')[1]
//                     const decoded = verifyToken(token!)
//                     return {user: decoded}
//                 } catch (error) {
//                     return {}
//                 }
//             }
//             return {}
//         }
//     })
// )


// app.get('/', (req: Request, res: Response) => {
//     res.json({
//         message: 'Welcome to Express + TypeScript API',
//         timestamp: new Date()
//     })
// })

// // Healt check
// app.get('/health', (req: Request, res: Response) => {
//     res.json({
//         status: 'OK',
//         uptime: process.uptime(),
//         timeStamp: Date.now()
//     })
// })

// // app.use(notFoundHandler)
// // app.use(errorHandler)

// const startServer = async () => {
// //   await apolloServer.start();

//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//     console.log(`📝 Environment: ${config.nodeEnv}`);
//     console.log(`🔷 GraphQL endpoint: http://localhost:${PORT}/graphql`);
//   });
// };

// startServer();

import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import {config} from './config'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import { requestLogger } from './middlewares/logger'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler'
import { ApolloServer } from '@apollo/server'
import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/schema'
import { verifyToken } from './utils/utils'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'

dotenv.config()

const app: Express = express()
const PORT = config.port

// Middleware
app.use(express.json());
app.use(requestLogger);

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

const startServer = async () => {
   await apolloServer.start();

   app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
        context: async ({req, res}) => {
            const authHeader = req.headers.authorization || ''
            if(authHeader.startsWith('Bearer ')){
                try{
                    const token = authHeader.split(' ')[1]
                    const decoded = verifyToken(token!)
                    return {user: decoded}
                } catch (error) {
                    return {}
                }
            }
            return {}
        }
    }))


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

// app.use(notFoundHandler)
// app.use(errorHandler)



  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Environment: ${config.nodeEnv}`);
    console.log(`🔷 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
};

startServer();
