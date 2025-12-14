import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import fs from "fs";
import path from "path";

import { errorHandler } from "./middleware/error-handler.js";
import router from "./modules/dashboard/router.js";

const app = express()

app.use(cors())
app.use(helmet())
// app.use(compression())
app.use(express.json())

const logPath = path.join("./src/logs/access.log")
const accessLogStream = fs.createWriteStream(logPath, {flags: 'a'})

//For Production
app.use(morgan("tiny", {stream: accessLogStream }))

//For Development
app.use(morgan("dev"))

app.use('/api/live', router)

app.get('/', (req, res) => {
    res.send("Server Working Fine!..")
})

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

app.use(errorHandler)

export default app;