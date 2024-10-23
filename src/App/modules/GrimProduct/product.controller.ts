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
const getAllProduct = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await productServices.getAllProductFromDb(query)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get All Product Successfully '
    })
})
const editProduct = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const { id } = req.params
    const result = await productServices.editProductFromDB(data, id)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Edit Product Successfully '
    })
})
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await productServices.deleteProductFromDb(id)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Delete Product Successfully '
    })
})
const getProductById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await productServices.getProductByIdFromBD(id)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get  Product By Id Successfully '
    })
})

export const productControllers = {
    getProductByCategory,
    createProduct,
    getAllProduct,
    editProduct,
    deleteProduct,
    getProductById
}