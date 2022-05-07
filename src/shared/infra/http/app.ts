import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";

import "../../containers";
import express , {Request , Response , NextFunction } from "express";
import { router } from "./routes";
import morgan from "morgan";
import { AppError } from "../../errors/AppError";
import upload from "../../../configs/upload";
import {Tasks} from "../../../routines/cron";
import {container} from "tsyringe";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

app.use("/uploads", express.static(`${upload.uploadDir}/uploads`));

const tasks = container.resolve(Tasks);

tasks.InitializateTasks();

app.use((error : Error, req : Request , res : Response , next : NextFunction ) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({ message : error.message});
    }
    return res.status(500).json({error : error.message})
})

export default app

