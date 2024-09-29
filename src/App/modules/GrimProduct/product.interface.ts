import { Types } from "mongoose";

export type TProduct = {
    _id?: Types.ObjectId
    title: string;
    image: string;
    price: number;
    quantity: number;
    categoryName: string;
    subCategoryName: string;
};
