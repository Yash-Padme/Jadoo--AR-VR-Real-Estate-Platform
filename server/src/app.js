import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json({limit: "16kb"}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

//routers
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/property', propertyRouter);

export { app, port};