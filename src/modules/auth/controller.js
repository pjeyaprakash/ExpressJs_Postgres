import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../../config/env.js";
import { createUser, findUserByEmail } from "./AuthModel.js";
import { ServerError } from "../../utils/ServerError.js";
import { OAuth2Client } from "google-auth-library"

const googleClient = new OAuth2Client(env.googleClientId)

export const googleAuth = async(req , res) => {
    console.log("called")
    const { credential } = req.body

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: env.googleClientId
    })

    const payload = ticket.getPayload()

    let user = await findUserByEmail(payload.email)


    if(!user){
      await createUser(payload)
    }

    const token = jwt.sign(
      {email: payload.email},
      env.jwtSecret,
      {expiresIn: "1d"}
    )

    res.status(200).json({
      success: true,
      token
    })
        
}


export const signup = async(req, res) => {
        const data = req.body

        const bcryptedPassword = await bcrypt.hash(data.password, 8)

        const userId = await createUser(data, bcryptedPassword)

        const token = jwt.sign(
            {email: data.email},
            env.jwtSecret,
            {expiresIn:"1d"}
        )

        res.status(201).json({ success: true, userId, token})
}


export const signin = async (req, res) => {

        const data = req.body
        const user = await findUserByEmail(data.email);

        if(!user) throw new ServerError(404, "User Not Found")

        const isPasswordValid = await bcrypt.compare(data.password, user.password)

        if(!isPasswordValid) throw new ServerError(401, "Invalid Password")

        const token = jwt.sign(
            {email:data.email},
            env.jwtSecret,
            {expiresIn: "1d"}
        )

        res.status(200).json({
            success: true,
            token
        })
}
