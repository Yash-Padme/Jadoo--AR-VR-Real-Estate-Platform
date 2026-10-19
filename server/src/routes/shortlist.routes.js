import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { toggleShortlist, getShortlist, compareProperties } from "../controllers/shortlist.controller.js";

// Creates the router for saving and comparing properties.
const router = Router();

// Require authentication for every shortlist operation.
router.use(verifyJWT);

/**
 * @openapi
 * /api/v1/shortlist/toggle:
 *   post:
 *     summary: Add or remove a property from the shortlist
 *     tags: [Shortlist]
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [propertyId]
 *             properties:
 *               propertyId: { type: string, example: 665f1a2b3c4d5e6f78901234 }
 *     responses:
 *       200: { description: Shortlist updated }
 *       201: { description: Shortlist created }
 */
router.route("/toggle").post(toggleShortlist);

/**
 * @openapi
 * /api/v1/shortlist:
 *   get:
 *     summary: Get the current user's shortlist
 *     tags: [Shortlist]
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       200: { description: Shortlisted properties returned }
 */
router.route("/").get(getShortlist);

/**
 * @openapi
 * /api/v1/shortlist/compare:
 *   post:
 *     summary: Compare two or three properties
 *     tags: [Shortlist]
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [propertyIds]
 *             properties:
 *               propertyIds:
 *                 type: array
 *                 minItems: 2
 *                 maxItems: 3
 *                 items: { type: string }
 *     responses:
 *       200: { description: Property comparison returned }
 *       400: { description: Two or three property IDs are required }
 */
router.route("/compare").post(compareProperties);

// Export this router to be mounted by the main application.
export default router;