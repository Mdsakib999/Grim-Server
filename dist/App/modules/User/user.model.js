"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-vars */
const mongoose_1 = require("mongoose");
const userModelSchema = new mongoose_1.Schema({
    userName: { type: String, required: [true, ' User Name is Required'] },
    password: { type: String, required: [true, 'Password is Required'] },
    role: { type: String, enum: ['customer', 'admin', 'superAdmin'], default: 'customer' },
    ref: { type: [String], default: [], required: false, ref: "User" },
    dollar: { type: Number, default: 0, required: false }
}, {
    timestamps: true
});
exports.User = (0, mongoose_1.model)('User', userModelSchema);
