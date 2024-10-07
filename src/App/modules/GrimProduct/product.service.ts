import { TProduct } from "./product.interface"
import Product from "./product.model"



const getProductByCategoryFromDB = async (query: Record<string, unknown>) => {

    let result = Product.find()
    const categoryName: string = query?.categoryName as string
    if (categoryName) {
        result = result.where('categoryName').equals(categoryName)
    }
    const subCategoryName: string = query.subCategoryName as string

    if (subCategoryName) {
        result = result.where('subCategoryName').equals(subCategoryName)
    }
    const product = await result.exec()
    return product
}
const createProductIntoDB = async (payload: TProduct) => {
    const result = await Product.create(payload)
    return result
}

export const productServices = {
    getProductByCategoryFromDB,
    createProductIntoDB
}