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
exports.userServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const appError_1 = __importDefault(require("../../errors/appError"));
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Hash the password
        userData.password = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_rounds));
        // Check if the user already exists
        const isUserExist = yield user_model_1.User.findOne({ userName: userData.userName }).session(session);
        if (isUserExist) {
            throw new appError_1.default(400, 'User already exists');
        }
        const newUserData = {
            userName: userData.userName,
            role: userData.role,
            password: userData.password
        };
        // Create the new user
        const newUser = yield user_model_1.User.create([newUserData], { session });
        // If a referral code exists, process the referral
        if (userData.ref) {
            const refUserId = atob(userData.ref); // Decode the referral userId from the referral code
            // Fetch the referring user
            const refUser = yield user_model_1.User.findById(refUserId).session(session);
            if (!refUser) {
                throw new appError_1.default(400, 'Referring user does not exist');
            }
            const result2 = yield user_model_1.User.updateOne({ _id: refUserId }, { $push: { ref: newUser[0]._id } }, { session });
            console.log(result2);
        }
        // Commit the transaction if everything is successful
        yield session.commitTransaction();
        session.endSession();
        return null; // Return the newly created user
    }
    catch (error) {
        // Abort the transaction on error
        yield session.abortTransaction();
        session.endSession();
        throw error; // Re-throw the error so it can be handled elsewhere
    }
});
const userLoginFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ userName: userData.userName });
    if (!user) {
        throw new appError_1.default(404, "User doesn't exist");
    }
    const isPasswordTrue = yield bcrypt_1.default.compare(userData.password, user === null || user === void 0 ? void 0 : user.password);
    if (isPasswordTrue) {
        const jwtData = { userName: user === null || user === void 0 ? void 0 : user.userName, role: user === null || user === void 0 ? void 0 : user.role };
        console.log(jwtData);
        const result = jsonwebtoken_1.default.sign(jwtData, config_1.default.jwt_secret);
        console.log(result);
        return { token: result };
    }
    else {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'Wrong password');
    }
});
const userPasswordChangeFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ userName: payload.userName });
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'User is not exist');
    }
    const isPasswordTrue = yield bcrypt_1.default.compare(payload.currentPassword, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (isPasswordTrue) {
        const password = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
        const result = yield user_model_1.User.updateOne({ userName: payload.userName }, { $set: { password } });
        if (result) {
            return null;
        }
    }
    else {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'Wrong Password');
    }
});
const getMeFromDb = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userName }).select('-password').populate({
        path: 'ref',
        select: '-password -_id -role -updatedAt -createdAt ',
    });
    return result;
});
const getAllUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select('-password -ref');
    return result;
});
const deleteUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.deleteOne({ _id: id });
    return result;
});
exports.userServices = {
    createUserIntoDB,
    userLoginFromDB,
    userPasswordChangeFromDB,
    getMeFromDb,
    getAllUserFromDb,
    deleteUserFromDb
};
