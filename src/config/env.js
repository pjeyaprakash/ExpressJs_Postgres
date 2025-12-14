import dotenv from "dotenv";
dotenv.config();

export const missingVariable = (v) => {
    console.log("Error: ",v, " not found in .env")
    process.exit(1)
}

export const env = {
    nodeEnv: process.env.NODE_ENV || missingVariable("NODE_ENV"), 
    port: process.env.PORT || missingVariable("PORT"),
    dbHost: process.env.DB_HOST || missingVariable("DB_HOST"),
    dbPort: process.env.DB_PORT || missingVariable("DB_PORT"),
    dbUser: process.env.DB_USER || missingVariable("DB_USER"),
    dbPassword: process.env.DB_PASSWORD || missingVariable("DB_PASSWORD"),
    dbName: process.env.DB_NAME || missingVariable("DB_NAME"),
    jwtSecret: process.env.JWT_SECRET || missingVariable("JWT_SECRET"),
    googleClientId: process.env.GOOGLE_CLIENT_ID || missingVariable("GOOGLE_CLIENT_ID"),
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || missingVariable("GOOGLE_CLIENT_SECRET"),
};