/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from './../../config/index';

const userModelSchema = new Schema<TUser>({
    userName: { type: String, required: [true, ' User Name is Required'] },
    password: { type: String, required: [true, 'Password is Required'] },
    role: { type: String, enum: ['customer', 'admin', 'superAdmin'], default: 'customer' }
}, {
    timestamps: true
})



export const User = model<TUser>('User', userModelSchema) 
