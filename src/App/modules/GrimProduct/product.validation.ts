import { z } from "zod";


const productValidationSchema = z.object({
    body: z.object({
        _id: z.string().optional(),
        title: z.string(),
        image: z.string(),
        price: z.number(),
        quantity: z.number(),
        categoryName: z.string(),
        subCategoryName: z.string(),
        oldImgUrl: z.string().optional()
    }),
});
const productEditValidationSchema = z.object({
    body: z.object({
        _id: z.string().optional(),
        title: z.string(),
        image: z.string(),
        price: z.number(),
        quantity: z.number(),
        categoryName: z.string().optional(),
        subCategoryName: z.string().optional(),
        oldImgUrl: z.string().optional()
    }),
});


export const productValidation = {
    productValidationSchema,
    productEditValidationSchema
}