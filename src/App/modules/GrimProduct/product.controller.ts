import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { productServices } from "./product.service";


const getProductByCategory = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await productServices.getProductByCategoryFromDB(query)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Create Successfully '
    })

})
const createProduct = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const result = await productServices.createProductIntoDB(data)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product Create Successfully '
    })
})

export const productControllers = {
    getProductByCategory,
    createProduct
}