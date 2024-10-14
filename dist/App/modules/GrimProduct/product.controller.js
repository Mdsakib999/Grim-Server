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
exports.productControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const product_service_1 = require("./product.service");
const getProductByCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield product_service_1.productServices.getProductByCategoryFromDB(query);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Create Successfully '
    });
}));
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield product_service_1.productServices.createProductIntoDB(data);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product Create Successfully '
    });
}));
const getAllProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield product_service_1.productServices.getAllProductFromDb(query);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Get All Product Successfully '
    });
}));
const editProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    const result = yield product_service_1.productServices.editProductFromDB(data, id);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Edit Product Successfully '
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.productServices.deleteProductFromDb(id);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Delete Product Successfully '
    });
}));
exports.productControllers = {
    getProductByCategory,
    createProduct,
    getAllProduct,
    editProduct,
    deleteProduct
};
