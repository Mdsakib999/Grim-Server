import { z } from "zod";



const userValidationSchema = z.object({
    body: z.object({
        userName: z.string().min(5),
        password: z.string().min(6).max(20),
        role: z.string().optional()
    })
})

export const userValidation = {
    userValidationSchema
}