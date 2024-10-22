import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { categoryServices } from "./category.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryServices.getAllCategoryFromDB()
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get All Category Successfully '
    })

})
const createCategory = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const result = await categoryServices.createCategoryFromDB(data)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create Category Successfully '
    })

})
const editCategory = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const { id } = req.params
    const result = await categoryServices.editCategoryFromDB(data, id)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create Category Successfully '
    })

})
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await categoryServices.deleteCategoryFromDB(id)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Delete Category Successfully '
    })

})
const createSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body
    const result = await categoryServices.createSubCategoryIntoDB(data, id)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create Sub Category Successfully '
    })

})
const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body
    const result = await categoryServices.deleteSubCategoryIntoDB(data, id)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Delete Sub Category Successfully '
    })

})

export const categoryControllers = {
    getAllCategory,
    createCategory,
    deleteCategory,
    editCategory,
    createSubCategory,
    deleteSubCategory
}