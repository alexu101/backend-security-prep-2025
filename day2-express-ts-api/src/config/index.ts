export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    apiVersion: process.env.API_VERSION || 'v1'
}

const requiredEnvVars = ['PORT']

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]){
        console.warn(`Warning: ${envVar} is not set in environment variables`)
    }
})