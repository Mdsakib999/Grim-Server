"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        auto: true, // Automatically generate the ObjectId
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    subCategoryName: {
        type: String,
        required: true,
    },
});
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
