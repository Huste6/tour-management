import { Request,Response } from "express";
import Tour from "../../models/tour.model";
import Category from "../../models/category.model";
import { generateOrderTour } from "../../helper/generate";
import TourCategory from "../../models/tour-category.model";

//[GET] /admin/tours
export const index = async(req:Request,res:Response)=> {
    const tours = await Tour.findAll({
        where:{
            deleted:false
        },
        raw:true
    });
    tours.forEach(item => {
        if(item["images"]){
            item["image"] = JSON.parse(item["images"])[0];
        }
        item["price_special"] = item["price"] * (1-item["discount"]/100);
    })
    res.render("admin/pages/tours/index",{
        pageTitle: "Danh sách tour",
        tours: tours
    });
}
//[GET] /admin/tours/create
export const create = async(req:Request,res:Response)=> {
    const categories = await Category.findAll({
        where:{
            status:"active",
            deleted:false
        },
        raw:true
    })
    res.render("admin/pages/tours/create",{
        pageTitle: "Thêm mới tour",
        categories:categories
    });
}
//[POST] /admin/tours/create
export const createPost = async(req:Request,res:Response)=>{
    const countTour = await Tour.count();
    const code = generateOrderTour(countTour+1);
    if(req.body.position === ""){
        req.body.position = countTour+1
    }else{
        req.body.position=parseInt(req.body.position)
    }
    const dataTour = {
        title:req.body.title,
        code:code,
        price:parseInt(req.body.price),
        discount: parseInt(req.body.discount),
        stock: parseInt(req.body.stock),
        timeStart: req.body.timeStart,
        position: req.body.position,
        status: req.body.status
    }
    const tour = await Tour.create(dataTour);
    const tourID = tour["id"];
    
    const dataTourCategory = {
        tour_id: tourID,
        category_id: parseInt(req.body.category_id)
    }
    await TourCategory.create(dataTourCategory);
    res.redirect("back");
}