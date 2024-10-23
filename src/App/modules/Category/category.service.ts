import httpStatus from "http-status"
import AppError from "../../errors/appError"
import { TCategory, TUpdateCategory } from "./category.interface"
import { Category } from "./category.model"
import Product from "../GrimProduct/product.model"


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
    console.log(isExist);
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Category Not Found")
    }
    const isProductExist = await Product.find({ categoryName: isExist.category })
    if (isProductExist.length === 0) {
        const result = await Category.findByIdAndUpdate(id, { $set: { ...payload } })
        return result
    }
    else {
        throw new AppError(httpStatus.NOT_FOUND, "This Category Have product");
    }
}
const deleteCategoryFromDB = async (id: string) => {
    const isExist = await Category.findById(id)
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Category doesn't exist");
    }
    const isProductExist = await Product.find({ categoryName: isExist.category })
    if (isProductExist.length === 0) {
        const result = await Category.deleteOne({ _id: id })
        return result
    }
    else {
        throw new AppError(httpStatus.CONFLICT, "This Category Have Product ");
    }
}
const createSubCategoryIntoDB = async (payload: Partial<TCategory>, id: string) => {
    // Check if the category exists
    const isCategoryExist = await Category.findById(id);
    if (!isCategoryExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Category doesn't exist");
    }

    // Add the new subcategory to the existing category
    const isSubCategoryExist = await Category.findOne({ subCategory: payload.subCategory })
    if (isSubCategoryExist) {
        throw new AppError(httpStatus.CONFLICT, "Sub Category Already exist");
    }
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

    const isProductExist = await Product.find({ subCategoryName: payload.subCategory })
    if (isProductExist.length === 0) {
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
    }
    else {
        throw new AppError(httpStatus.CONFLICT, "This Sub Category Have Product");
    }
};
const updateSubCategoryFromDB = async (payload: TUpdateCategory, id: string) => {
    // Check if the category exists
    const isCategoryExist = await Category.findById(id);
    if (!isCategoryExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Category doesn't exist");
    }

    // Check if any products exist with the old subcategory name
    const isProductExist = await Product.find({ subCategoryName: payload.oldCategory });
    // If no products are associated with the old subcategory, proceed with the update
    if (isProductExist.length == 0) {
        console.log('hello');
        const result = await Category.findOneAndUpdate(
            { _id: id },
            {
                $push: { subCategory: payload?.newCategory },  // Add the new subcategory
            },
            { new: true }  // Return the updated category document
        );
        if (result) {
            const result1 = await Category.findByIdAndUpdate(id, { $pull: { subCategory: payload?.oldCategory }, })
            if (result1) {
                return result;
            }
        }

    } else {
        // If products exist with the old subcategory, throw a conflict error
        throw new AppError(httpStatus.CONFLICT, "This Sub Category is associated with products and cannot be changed.");
    }
};



export const categoryServices = {
    getAllCategoryFromDB,
    createCategoryFromDB,
    deleteCategoryFromDB,
    editCategoryFromDB,
    createSubCategoryIntoDB,
    deleteSubCategoryIntoDB,
    updateSubCategoryFromDB
}