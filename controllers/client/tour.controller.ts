import { Request,Response } from "express";
import Tour from "../../models/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";

//[GET] /tours//:slugCategory
export const index = async(req:Request,res:Response)=>{
    const slugCategory = req.params.slugCategory;
    const tours = await sequelize.query(`
        select tours.*,ROUND(price*(1-discount/100),0) as price_special
        from tours
        join tour_category on tours.id = tour_category.tour_id
        join categories on categories.id = tour_category.category_id
        where
            categories.slug='${slugCategory}'
            and categories.deleted = false
            and categories.status = 'active'
            and tours.deleted = false
            and tours.status = 'active';
    `,{
        type: QueryTypes.SELECT
    })
    tours.forEach(item=>{
        if(item["images"]){
            const images = JSON.parse(item["images"]);
            item["image"] = images[0];
        }
        item["price_special"] = parseFloat(item["price_special"]);
    })
    res.render("client/pages/tours/index",{
        pageTitle: "Danh sách tours",
        tours:tours
    });
}