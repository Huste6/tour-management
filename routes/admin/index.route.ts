import { Express } from "express";
import { categoriesRoutes } from "./categories.route";
import { systemConfig } from "../../config/system";
import { toursRoutes } from "./tour.route";
import { uploadRoutes } from "./upload.routes";

const adminRoutes = (app: Express):void => {
    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    app.use(`/${PATH_ADMIN}/categories`,categoriesRoutes);
    app.use(`/${PATH_ADMIN}/tours`,toursRoutes);
    app.use(`/${PATH_ADMIN}/upload`, uploadRoutes);
}

export default adminRoutes;