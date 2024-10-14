/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/appError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";


const createUserIntoDB = async (userData: TUser) => {
    const session = await mongoose.startSession();


    session.startTransaction();
    try {
        // Hash the password
        userData.password = await bcrypt.hash(userData.password, Number(config.bcrypt_salt_rounds));

        // Check if the user already exists
        const isUserExist = await User.findOne({ userName: userData.userName }).session(session);
        if (isUserExist) {
            throw new AppError(400, 'User already exists');
        }
        const newUserData = {
            userName: userData.userName,
            role: userData.role,
            password: userData.password
        }
        // Create the new user
        const newUser = await User.create([newUserData], { session });

        // If a referral code exists, process the referral
        if (userData.ref) {
            const refUserId = atob(userData.ref); // Decode the referral userId from the referral code

            // Fetch the referring user
            const refUser = await User.findById(refUserId).session(session);
            if (!refUser) {
                throw new AppError(400, 'Referring user does not exist');
            }

            const result2 = await User.updateOne(
                { _id: refUserId },
                { $push: { ref: newUser[0]._id } },
                { session },

            );
            console.log(result2);
        }

        // Commit the transaction if everything is successful
        await session.commitTransaction();
        session.endSession();

        return null; // Return the newly created user
    } catch (error) {
        // Abort the transaction on error
        await session.abortTransaction();
        session.endSession();
        throw error; // Re-throw the error so it can be handled elsewhere
    }
};
const userLoginFromDB = async (userData: Partial<TUser>) => {
    const user = await User.findOne({ userName: userData.userName })

    if (!user) {
        throw new AppError(404, "User doesn't exist")
    }
    const isPasswordTrue = await bcrypt.compare(userData.password as string, user?.password as string)
    if (isPasswordTrue) {
        const jwtData = { userName: user?.userName, role: user?.role }
        console.log(jwtData);
        const result = jwt.sign(jwtData, config.jwt_secret as string,)
        console.log(result);
        return { token: result }
    }
    else {
        throw new AppError(httpStatus.FORBIDDEN, 'Wrong password')
    }
}
const userPasswordChangeFromDB = async (payload: { userName: string, currentPassword: string, newPassword: string }) => {
    const isUserExist = await User.findOne({ userName: payload.userName })
    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not exist')
    }
    const isPasswordTrue = await bcrypt.compare(payload.currentPassword as string, isUserExist?.password as string)
    if (isPasswordTrue) {
        const password = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds))
        const result = await User.updateOne({ userName: payload.userName }, { $set: { password } })
        if (result) {
            return null
        }
    }
    else {
        throw new AppError(httpStatus.FORBIDDEN, 'Wrong Password')
    }

}

const getMeFromDb = async (userName: string) => {
    const result = await User.findOne({ userName }).select('-password').populate({
        path: 'ref',
        select: '-password -_id -role -updatedAt -createdAt ',
    })
    return result
}

export const userServices = {
    createUserIntoDB,
    userLoginFromDB,
    userPasswordChangeFromDB,
    getMeFromDb
}