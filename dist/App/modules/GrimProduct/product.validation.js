"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        _id: zod_1.z.string().optional(),
        title: zod_1.z.string(),
        image: zod_1.z.string(),
        price: zod_1.z.number(),
        quantity: zod_1.z.number(),
        categoryName: zod_1.z.string(),
        subCategoryName: zod_1.z.string(),
        oldImgUrl: zod_1.z.string().optional()
    }),
});
const productEditValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        _id: zod_1.z.string().optional(),
        title: zod_1.z.string(),
        image: zod_1.z.string(),
        price: zod_1.z.number(),
        quantity: zod_1.z.number(),
        categoryName: zod_1.z.string().optional(),
        subCategoryName: zod_1.z.string().optional(),
        oldImgUrl: zod_1.z.string().optional()
    }),
});
exports.productValidation = {
    productValidationSchema,
    productEditValidationSchema
};
