import "dotenv/config";
import "express-async-errors";
import express from "express";
import { router } from "./routes.js";
import morgan from "morgan";
import { AppError } from "../../errors/AppError.js";
import upload from "../../../configs/upload.js";
import {Tasks} from "../../../routines/cron.js"

const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(router)

app.use("/uploads", express.static(`${upload.uploadDir}/uploads`))

new Tasks().InitializateTasks()

app.use((error, req, res, next) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({ message : error.message});
    }
    return res.status(500).json({error : error.message})
})

export default app

