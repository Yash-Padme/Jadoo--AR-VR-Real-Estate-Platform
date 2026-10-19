import { Router } from "express";
import { registerUser, logInUser, logOutUser, currentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

/**
 * @openapi
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, userName, password]
 *             properties:
 *               email: { type: string, format: email, example: user@example.com }
 *               userName: { type: string, example: jadoo_user }
 *               password: { type: string, format: password, example: strongPassword123 }
 *     responses:
 *       201: { description: User created successfully }
 *       400: { description: Invalid or duplicate user data }
 */
router.route("/register").post(registerUser)

/**
 * @openapi
 * /api/v1/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       200: { description: Login successful; authentication cookies are set }
 *       400: { description: Invalid email or unknown user }
 *       401: { description: Invalid or missing password }
 */
router.route("/login").post(logInUser)

/**
 * @openapi
 * /api/v1/users/logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [Users]
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       200: { description: Logout successful }
 *       401: { description: Authentication required }
 */
router.route("/logout").post(verifyJWT, logOutUser)

/**
 * @openapi
 * /api/v1/users/user:
 *   get:
 *     summary: Get the current user
 *     tags: [Users]
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       200: { description: Current user returned }
 *       401: { description: Authentication required }
 */
router.route("/user").get(verifyJWT,currentUser);

export default router;