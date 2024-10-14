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
exports.deleteImageUrl = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../config"));
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloud_name,
    api_key: config_1.default.api_key,
    api_secret: config_1.default.api_secret,
});
const deleteImageUrl = (url) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract public_id from the URL
        const public_id = (_a = url.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0];
        if (!public_id) {
            throw new Error("Invalid URL or public ID");
        }
        // Call the Cloudinary API to delete the image
        const result = yield cloudinary_1.v2.api.delete_resources([public_id], {
            type: "upload",
            resource_type: "image",
        });
        console.log("Deletion Result:", result);
        return { result }; // Return the result if needed
    }
    catch (error) {
        console.error("Error deleting image:", error);
        throw error; // Rethrow error for higher-level handling if needed
    }
});
exports.deleteImageUrl = deleteImageUrl;
