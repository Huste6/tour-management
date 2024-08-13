import { Request,Response } from "express";

//[GET] /categories
export const index = async(req:Request,res:Response)=> {
    const data = req.body;
    res.json({
        code:200,
        message: "Đặt hàng thành công!"
    })
}