import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { chatWithPropertyAssistant, getChatHistory } from "../controllers/ai.controller.js";

// Creates the router for authenticated AI assistant endpoints.
const router = Router();

// Protect all AI routes so only logged-in users can access their conversations.
router.use(verifyJWT);

/**
 * @openapi
 * /api/v1/ai/chat:
 *   post:
 *     summary: Ask the AI property assistant a question
 *     tags: [AI Assistant]
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [query]
 *             properties:
 *               query: { type: string, example: Find a two-bedroom home under 30000 per month }
 *               propertyIds:
 *                 type: array
 *                 items: { type: string }
 *                 description: Optional property IDs to use as context.
 *     responses:
 *       200: { description: AI response returned }
 *       400: { description: Query prompt is required }
 */
router.route("/chat").post(chatWithPropertyAssistant);

/**
 * @openapi
 * /api/v1/ai/history:
 *   get:
 *     summary: Get the current user's AI chat history
 *     tags: [AI Assistant]
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       200: { description: Chat history returned }
 */
router.route("/history").get(getChatHistory);

// Export this router to be mounted by the main application.
export default router;