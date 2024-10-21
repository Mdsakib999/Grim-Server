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
const userLogin = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const result = await userServices.userLoginFromDB(data)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Login Successfully '
    })
})
const userPasswordChange = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const result = await userServices.userPasswordChangeFromDB(data)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password Change Successfully '
    })
})
const getMe = catchAsync(async (req: Request, res: Response) => {
    const { userName } = req.user
    const result = await userServices.getMeFromDb(userName)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get me Successfully'
    })
})
const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.getAllUserFromDb()
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get All User Successfully'
    })
})
const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await userServices.deleteUserFromDb(id)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: ' User Delete Successfully'
    })
})

export const userController = {
    createUser,
    userLogin,
    userPasswordChange,
    getMe,
    getAllUser,
    deleteUser
}