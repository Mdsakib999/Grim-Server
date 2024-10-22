import httpStatus from "http-status"
import AppError from "../../errors/appError"
import { TCategory } from "./category.interface"
import { Category } from "./category.model"


const getAllCategoryFromDB = async () => {
    const result = await Category.find()
    return result
}
const createCategoryFromDB = async (payload: Partial<TCategory>) => {
    const isExist = await Category.findOne({ category: payload.category })
    if (isExist) {
        throw new AppError(httpStatus.CONFLICT, "Category is Already Exist")
    }
    const result = await Category.create(payload)
    return result
}
const editCategoryFromDB = async (payload: Partial<TCategory>, id: string) => {
    const isExist = await Category.findById(id)
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Category Not Found")
    }
    const result = await Category.findByIdAndUpdate(id, { $set: { ...payload } })
    return result
}
const deleteCategoryFromDB = async (id: string) => {
    const result = await Category.deleteOne({ _id: id })
    return result
}
const createSubCategoryIntoDB = async (payload: Partial<TCategory>, id: string) => {
    // Check if the category exists
    const isCategoryExist = await Category.findById(id);
    if (!isCategoryExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Category doesn't exist");
    }

    // Add the new subcategory to the existing category
    const result = await Category.findByIdAndUpdate(
        id,
        {
            $push: { subCategory: payload.subCategory }, // Assuming payload contains subCategory field
        },
        { new: true } // To return the updated document
    );

    // Return the updated result or throw an error if update failed
    if (!result) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to add subcategory");
    }

    return result;
};
const deleteSubCategoryIntoDB = async (payload: Partial<TCategory>, id: string) => {

    // Check if the category exists
    const isCategoryExist = await Category.findById(id);
    if (!isCategoryExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Category doesn't exist");
    }

    // Add the new subcategory to the existing category
    const result = await Category.findByIdAndUpdate(
        id,
        {
            $pull: { subCategory: payload.subCategory }, // Assuming payload contains subCategory field
        },
        { new: true } // To return the updated document
    );
    // Return the updated result or throw an error if update failed
    if (!result) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to add subcategory");
    }

    return result;
};


export const categoryServices = {
    getAllCategoryFromDB,
    createCategoryFromDB,
    deleteCategoryFromDB,
    editCategoryFromDB,
    createSubCategoryIntoDB,
    deleteSubCategoryIntoDB
}