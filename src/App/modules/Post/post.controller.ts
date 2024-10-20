import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { postServices } from "./post.service"
import { Request, Response } from "express"

const createPost = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const result = await postServices.createPostIntoDB(data)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Post Create Successfully '
    })

})
const getAllPost = catchAsync(async (req: Request, res: Response) => {
    const result = await postServices.getAllPostFromDB()
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get Post Successfully '
    })

})
const updatePost = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const { id } = req.params
    const result = await postServices.updatePostIntoDB(data, id)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Update Post Successfully '
    })

})
const deletePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await postServices.deletePostFromDB(id)
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Delete Post Successfully '
    })

})
export const postController = {
    createPost,
    getAllPost,
    updatePost,
    deletePost
}