import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";


const postSchema = new Schema<TPost>({
    postData: { type: String, required: [true, 'Post Data is Required'] }
}, { timestamps: true })

export const Post = model<TPost>('Post', postSchema);