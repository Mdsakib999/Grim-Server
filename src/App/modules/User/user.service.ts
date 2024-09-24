import config from "../../config";
import AppError from "../../errors/appError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createUserIntoDB = async (userData: TUser) => {

    userData.password = await bcrypt.hash(userData.password, Number(config.bcrypt_salt_rounds))
    const isUserExist = await User.findOne({ userName: userData.userName })
    if (isUserExist) {
        throw new AppError(400, 'User is Already exist')
    }
    const result = await User.create(userData)
    return result
}
const getMeFromDB = async (userData: Partial<TUser>) => {
    const user = await User.findOne({ userName: userData.userName })
    const isPasswordTrue = await bcrypt.compare(userData.password as string, user?.password as string)
    console.log(isPasswordTrue);
    if (isPasswordTrue) {
        const jwtData = { userName: user?.userName, role: userData.role }
        const result = jwt.sign(jwtData, config.jwt_secret as string,)
        console.log(result);
        return { token: result }


    }
}

export const userServices = {
    createUserIntoDB,
    getMeFromDB
}