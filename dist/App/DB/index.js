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
exports.seedAdmin = void 0;
const config_1 = __importDefault(require("../config"));
const user_interface_1 = require("../modules/User/user.interface");
const user_model_1 = require("../modules/User/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const superUser = {
    userName: 'grimMarket159',
    password: '123456789@',
    role: user_interface_1.UserRole.admin,
};
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ role: superUser.role });
    if (!isExist) {
        superUser.password = yield bcrypt_1.default.hash(superUser.password, Number(config_1.default.bcrypt_salt_rounds));
        yield user_model_1.User.create(superUser);
    }
});
exports.seedAdmin = seedAdmin;
