import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";


const productSchema = new Schema<TProduct>({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true, // Automatically generate the ObjectId
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    subCategoryName: {
        type: String,
        required: true,
    },
})

const Product = model<TProduct>('Product', productSchema)

export default Product