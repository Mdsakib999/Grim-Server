import { z } from "zod";



const categoryValidationSchema = z.object({
    body: z.object({
        category: z.string(),
        // subCategory: z.string().array().optional()
    })
})
export const categoryValidations = {
    categoryValidationSchema
} 