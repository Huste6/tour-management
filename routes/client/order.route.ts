import { Router } from "express";
import * as controller from "../../controllers/client/order.controller"

const router:Router = Router();

router.get("/",controller.index)

export const OrderRoutes:Router = router;