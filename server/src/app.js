import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables before configuring the application.
dotenv.config();

// Import route handlers for the application's feature areas.
import shortlistRouter from './routes/shortlist.routes.js';
import aiRouter from './routes/ai.routes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';

const app = express();
const port = process.env.PORT || 8000;

// Read and normalize the comma-separated list of allowed frontend origins.
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

// Parse JSON and form data, serve public assets, and read cookies from requests.
app.use(express.json({limit: "16kb"}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

// Serve the generated OpenAPI specification through an interactive Swagger UI.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (_req, res) => res.json(swaggerSpec));

// Allow only configured frontend origins and include cookies in cross-origin requests.
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
}))

// Register the main API route groups.
import userRouter from './routes/user.routes.js';
import propertyRouter from './routes/property.routes.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/property', propertyRouter);

// Register routes for saved properties and the AI property assistant.
app.use('/api/v1/shortlist', shortlistRouter);
app.use('/api/v1/ai', aiRouter);

// Export the configured app for the server entry point and the port setting.
export { app, port};