import { Express } from "express";
import { tourRoutes } from "./tour.route";
import { categoriesRoutes } from "./category.route";
import { cartRoutes } from "./cart.route";
import { OrderRoutes } from "./order.route";

const clientRoutes = (app: Express):void => {
    app.use('/tours',tourRoutes);
    app.use('/categories',categoriesRoutes);
    app.use('/cart',cartRoutes);
    app.use('/order',OrderRoutes);
}

export default clientRoutes;