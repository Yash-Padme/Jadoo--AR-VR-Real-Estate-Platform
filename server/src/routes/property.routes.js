import { Router } from "express";
import { getPropertyById, updatePropertyById, deletePropertyById, addProperty, getAllProperty } from "../controllers/property.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.midlleware.js"

const router = Router()

router.use(verifyJWT);

router.route("/addProperty").post(
    upload.fields([
        {
            name: "VRImage",
            maxCount: 1
        }
    ]),
    addProperty)

router.route("/getAllProperties").get(getAllProperty)

router.route("/getProperty/:id").get(getPropertyById);

router.route("/update/:id").put(updatePropertyById);

router.route("/delete/:id").delete(deletePropertyById);

export default router;