import dotenv from 'dotenv'
// load the environment variables from the .env file
dotenv.config()
// define the configuration object for the environment
export default {
  development: {
    environment: 'development',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
}
