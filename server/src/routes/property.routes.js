import { Router } from "express";
import { getPropertyById, updatePropertyById, deletePropertyById, addProperty, getAllProperty } from "../controllers/property.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"

// Creates the router for property listing operations.
const router = Router()

// Require authentication for every property endpoint.
router.use(verifyJWT);

/**
 * @openapi
 * /api/v1/property/addProperty:
 *   post:
 *     summary: Add a property listing
 *     tags: [Properties]
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, description, location, pincode, price, size, type, amenities, contact, bhk, VRImage]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               location: { type: string }
 *               pincode: { type: string }
 *               price: { type: string }
 *               size: { type: string }
 *               type: { type: string }
 *               amenities: { type: string }
 *               contact: { type: string }
 *               bhk: { type: string }
 *               VRImage: { type: string, format: binary }
 *     responses:
 *       201: { description: Property created successfully }
 *       400: { description: Missing required field or VR image }
 */
router.route("/addProperty").post(
    upload.fields([
        {
            name: "VRImage",
            maxCount: 1
        }
    ]),
    addProperty)

/**
 * @openapi
 * /api/v1/property/getAllProperties:
 *   get:
 *     summary: Get properties with optional filters
 *     tags: [Properties]
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - { in: query, name: budget, schema: { type: number } }
 *       - { in: query, name: bhk, schema: { type: string } }
 *       - { in: query, name: furnished, schema: { type: string } }
 *       - { in: query, name: locality, schema: { type: string } }
 *       - { in: query, name: maxCommute, schema: { type: number } }
 *     responses:
 *       200: { description: Matching properties returned }
 *       404: { description: No properties found }
 */
router.route("/getAllProperties").get(getAllProperty)

/**
 * @openapi
 * /api/v1/property/getProperty/{id}:
 *   get:
 *     summary: Get one property
 *     tags: [Properties]
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: Property returned }
 *       404: { description: Property not found }
 */
router.route("/getProperty/:id").get(getPropertyById);

/**
 * @openapi
 * /api/v1/property/update/{id}:
 *   put:
 *     summary: Update a property
 *     tags: [Properties]
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string } }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Property' }
 *     responses:
 *       200: { description: Property updated successfully }
 *       404: { description: Property not found }
 */
router.route("/update/:id").put(updatePropertyById);

/**
 * @openapi
 * /api/v1/property/delete/{id}:
 *   delete:
 *     summary: Delete a property
 *     tags: [Properties]
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: Property deleted successfully }
 *       404: { description: Property not found }
 */
router.route("/delete/:id").delete(deletePropertyById);

// Export this router to be mounted by the main application.
export default router;