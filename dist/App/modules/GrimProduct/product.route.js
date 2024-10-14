"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const router = (0, express_1.Router)();
router.get('/getProduct', product_controller_1.productControllers.getProductByCategory);
router.post('/create-product', (0, validateRequest_1.default)(product_validation_1.productValidation.productValidationSchema), product_controller_1.productControllers.createProduct);
router.get('/getAllProduct', product_controller_1.productControllers.getAllProduct);
router.patch('/editProduct/:id', (0, validateRequest_1.default)(product_validation_1.productValidation.productEditValidationSchema), product_controller_1.productControllers.editProduct);
router.delete('/:id', product_controller_1.productControllers.deleteProduct);
exports.productRoute = router;
