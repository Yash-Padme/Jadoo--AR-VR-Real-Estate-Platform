import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(express.json({limit: "16kb"}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
}))

//routers
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/property', propertyRouter);

export { app, port};