import { Router } from "express";
import multer from "multer"
import * as controller from "../../controllers/admin/tour.controller"
import { uploadFields } from "../../helper/uploadToCloudinary";

const router:Router = Router();
const upload = multer();

router.get("/",controller.index)

router.get("/create",controller.create)

router.post(
    "/create",
    upload.fields([
        {name: 'images', maxCount: 10}
    ]),
    uploadFields,
    controller.createPost
)

export const toursRoutes:Router = router;