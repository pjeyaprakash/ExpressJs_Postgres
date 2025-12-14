import jwt from "jsonwebtoken";
import { env } from "../config/env.js"
import { ServerError } from "../utils/ServerError.js";

export const verifyToken = (req, _, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if(!authHeader) throw new ServerError(401, "No Token Provided")

        const token = authHeader.split(" ")[1]

        if(!token) throw new ServerError(401, "Invalid Token format")

        jwt.verify(token, env.jwtSecret, (err, decoded) => {
            if(err) throw new ServerError(401, "Invalid or expired Token")
            req.used = decoded
            next()
        })

    } catch (error) {
        next(error)
    }
}