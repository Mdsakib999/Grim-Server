import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createUser = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const result = await userServices.createUserIntoDB(data)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Create Successfully '
    })

})
const getMe = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const result = await userServices.getMeFromDB(data)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Login Successfully '
    })
})

export const userController = {
    createUser,
    getMe
}