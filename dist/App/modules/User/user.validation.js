"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string().min(5),
        password: zod_1.z.string().min(6).max(20),
        role: zod_1.z.string().optional(),
        ref: zod_1.z.string().optional()
    })
});
exports.userValidation = {
    userValidationSchema
};
