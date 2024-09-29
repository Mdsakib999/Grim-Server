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
    }),
});


export const productValidation = {
    productValidationSchema
}