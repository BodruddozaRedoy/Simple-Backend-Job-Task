import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from './routes/user.routes'

export const app: Application = express();

// middlewares 
app.use(cors())
app.use(express.json())


// routes
app.use("/", (req:Request, res:Response) => {
    res.get("Api working")
}) 
app.use("/api", userRoutes)

// error handler 
app.use(errorHandler)