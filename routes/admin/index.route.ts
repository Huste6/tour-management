import { Express } from "express";
import { categoriesRoutes } from "./categories.route";
import { systemConfig } from "../../config/system";

const adminRoutes = (app: Express):void => {
    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    app.use(`/${PATH_ADMIN}/categories`,categoriesRoutes);
}

export default adminRoutes;