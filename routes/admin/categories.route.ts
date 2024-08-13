import { Router } from "express";
import * as controller from "../../controllers/admin/categories.controller"

const router:Router = Router();

router.get("/",controller.index)

export const categoriesRoutes:Router = router;