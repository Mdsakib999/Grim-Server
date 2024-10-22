import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";


const categorySchema = new Schema<TCategory>({

    category: { type: String },
    subCategory: { type: [String], default: [] }

})
export const Category = model<TCategory>('Category', categorySchema)