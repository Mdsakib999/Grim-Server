/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status"
import AppError from "../../errors/appError"
import { TProduct } from "./product.interface"
import Product from "./product.model"
import { deleteImageUrl } from "../../utils/deleteImage"



const getProductByCategoryFromDB = async (query: Record<string, unknown>) => {

    let result = Product.find()
    const categoryName: string = query?.categoryName as string
    if (categoryName) {
        // Case-insensitive filtering for categoryName
        result = result.where('categoryName').regex(new RegExp(categoryName, 'i'));
    }

    const subCategoryName: string = query?.subCategoryName as string;

    if (subCategoryName) {
        // Case-insensitive filtering for subCategoryName
        result = result.where('subCategoryName').regex(new RegExp(subCategoryName, 'i'));
    }
    const product = await result.exec()
    return product
}
const createProductIntoDB = async (payload: TProduct) => {
    const result = await Product.create(payload)
    return result
}
const getAllProductFromDb = async (query: Record<string, unknown>) => {
    let result = Product.find(); // Start with the base query

    // Extract categoryName and subCategoryName from the query object
    const categoryName: string = query?.categoryName as string;
    if (categoryName) {
        // Case-insensitive filtering for categoryName
        result = result.where('categoryName').regex(new RegExp(categoryName, 'i'));
    }

    const subCategoryName: string = query?.subCategoryName as string;

    if (subCategoryName) {
        // Case-insensitive filtering for subCategoryName
        result = result.where('subCategoryName').regex(new RegExp(subCategoryName, 'i'));
    }

    // Additional filters (e.g., searchTerm, minPrice, maxPrice)
    const { searchTerm, minPrice, maxPrice, sortBy = 'price', sortOrder = 'asc' } = query;

    // If searchTerm is provided, add a case-insensitive regex search for the title
    if (searchTerm) {
        result = result.where('title').regex(new RegExp(searchTerm as string, 'i'));
    }

    // Add minPrice and maxPrice filters if provided
    if (minPrice || maxPrice) {
        result = result.where('price');
        if (minPrice) {
            result = result.gte(Number(minPrice));
        }
        if (maxPrice) {
            result = result.lte(Number(maxPrice));
        }
    }

    // Sorting by the field specified in sortBy, with sortOrder as asc or desc
    const sortOrderValue = sortOrder === 'asc' ? 1 : -1;
    result = result.sort({ [sortBy as any]: sortOrderValue });

    // Execute the query and return the results
    const products = await result.exec();
    return products;
};

const editProductFromDB = async (payload: Partial<TProduct>, id: string) => {
    const isExist = await Product.findById(id)
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product is not exist')
    }
    if (payload.oldImgUrl) {
        await deleteImageUrl(payload.oldImgUrl)
        delete payload.oldImgUrl
    }
    payload.categoryName = isExist.categoryName
    payload.subCategoryName = isExist.subCategoryName
    const result = await Product.updateOne({ _id: id }, { $set: { ...payload } }, { upsert: true })
    return result
}
const deleteProductFromDb = async (id: string) => {
    const isExist = await Product.findById(id)
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product is not exist')
    }
    await deleteImageUrl(isExist.image)
    const result = await Product.deleteOne({ _id: id })
    return result
}
const getProductByIdFromBD = async (id: string) => {

    const result = await Product.findById(id)
    return result
}


export const productServices = {
    getProductByCategoryFromDB,
    createProductIntoDB,
    getAllProductFromDb,
    editProductFromDB,
    deleteProductFromDb,
    getProductByIdFromBD
}