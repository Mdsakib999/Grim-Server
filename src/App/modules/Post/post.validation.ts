import { z } from "zod";




const postValidationSchema = z.object({
    body: z.object({
        postData: z.string()
    })
})
export const postValidation = {
    postValidationSchema
}