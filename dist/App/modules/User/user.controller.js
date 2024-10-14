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
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    const result = yield user_service_1.userServices.createUserIntoDB(data);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Create Successfully '
    });
}));
const userLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield user_service_1.userServices.userLoginFromDB(data);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User Login Successfully '
    });
}));
const userPasswordChange = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield user_service_1.userServices.userPasswordChangeFromDB(data);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Password Change Successfully '
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.user;
    const result = yield user_service_1.userServices.getMeFromDb(userName);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Get me Successfully'
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getAllUserFromDb();
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Get All User Successfully'
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServices.deleteUserFromDb(id);
    (0, sendResponse_1.default)(res, {
        data: result,
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' User Delete Successfully'
    });
}));
exports.userController = {
    createUser,
    userLogin,
    userPasswordChange,
    getMe,
    getAllUser,
    deleteUser
};
