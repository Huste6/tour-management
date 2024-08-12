import { Express } from "express";
import { tourRoutes } from "./tour.route";
import { categoriesRoutes } from "./category.route";

const clientRoutes = (app: Express):void => {
    app.use('/tours',tourRoutes);
    app.use('/categories',categoriesRoutes);
}

export default clientRoutes;