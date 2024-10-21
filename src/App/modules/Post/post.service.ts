import { TPost } from "./post.interface";
import { Post } from "./post.model";


const createPostIntoDB = async (payload: TPost) => {
    const result = await Post.create(payload)
    return result
}
const updatePostIntoDB = async (payload: TPost, id: string) => {
    const result = await Post.updateOne({ _id: id }, { $set: { ...payload } }, { upsert: true })
    return result
}
const getAllPostFromDB = async () => {
    const result = await Post.find().sort({ createdAt: 'desc' })
    return result
}
const deletePostFromDB = async (id: string) => {
    const result = await Post.deleteOne({ _id: id })
    return result
}


export const postServices = {
    createPostIntoDB,
    getAllPostFromDB,
    updatePostIntoDB,
    deletePostFromDB

}