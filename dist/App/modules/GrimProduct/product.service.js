"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const product_model_1 = __importDefault(require("./product.model"));
const deleteImage_1 = require("../../utils/deleteImage");
const getProductByCategoryFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let result = product_model_1.default.find();
    const categoryName = query === null || query === void 0 ? void 0 : query.categoryName;
    if (categoryName) {
        result = result.where('categoryName').equals(categoryName);
    }
    const subCategoryName = query.subCategoryName;
    if (subCategoryName) {
        result = result.where('subCategoryName').equals(subCategoryName);
    }
    const product = yield result.exec();
    return product;
});
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(payload);
    return result;
});
const getAllProductFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    let result = product_model_1.default.find(); // Start with the base query
    // Extract categoryName and subCategoryName from the query object
    const categoryName = query === null || query === void 0 ? void 0 : query.categoryName;
    if (categoryName) {
        result = result.where('categoryName').equals(categoryName); // Filter by categoryName
    }
    const subCategoryName = query === null || query === void 0 ? void 0 : query.subCategoryName;
    if (subCategoryName) {
        result = result.where('subCategoryName').equals(subCategoryName); // Filter by subCategoryName
    }
    // Additional filters (e.g., searchTerm, minPrice, maxPrice)
    const { searchTerm, minPrice, maxPrice, sortBy = 'price', sortOrder = 'asc' } = query;
    // If searchTerm is provided, add a case-insensitive regex search for the title
    if (searchTerm) {
        result = result.where('title').regex(new RegExp(searchTerm, 'i'));
    }
    // Add minPrice and maxPrice filters if provided
    if (minPrice || maxPrice) {
        result = result.where('price');
        if (minPrice) {
            result = result.gte(Number(minPrice));
        }
        if (maxPrice) {
            result = result.lte(Number(maxPrice));
        }
    }
    // Sorting by the field specified in sortBy, with sortOrder as asc or desc
    const sortOrderValue = sortOrder === 'asc' ? 1 : -1;
    result = result.sort({ [sortBy]: sortOrderValue });
    // Execute the query and return the results
    const products = yield result.exec();
    return products;
});
const editProductFromDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield product_model_1.default.findById(id);
    if (!isExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Product is not exist');
    }
    if (payload.oldImgUrl) {
        yield (0, deleteImage_1.deleteImageUrl)(payload.oldImgUrl);
        delete payload.oldImgUrl;
    }
    payload.categoryName = isExist.categoryName;
    payload.subCategoryName = isExist.subCategoryName;
    const result = yield product_model_1.default.updateOne({ _id: id }, { $set: Object.assign({}, payload) }, { upsert: true });
    return result;
});
const deleteProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield product_model_1.default.findById(id);
    if (!isExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Product is not exist');
    }
    yield (0, deleteImage_1.deleteImageUrl)(isExist.image);
    const result = yield product_model_1.default.deleteOne({ _id: id });
    return result;
});
exports.productServices = {
    getProductByCategoryFromDB,
    createProductIntoDB,
    getAllProductFromDb,
    editProductFromDB,
    deleteProductFromDb
};
