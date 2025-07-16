import express, { Application } from "express";
import cors from 'cors'
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from './routes/user.routes'

export const app: Application = express();

// middlewares 
app.use(cors())
app.use(express.json())


// routes 
app.use("/api", userRoutes)

// error handler 
app.use(errorHandler)