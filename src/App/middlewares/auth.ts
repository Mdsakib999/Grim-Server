import { NextFunction, Request, Response } from "express";
import { UserRole } from "../modules/User/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { User } from "../modules/User/user.model";

type TUserRole = keyof typeof UserRole

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
        }
        const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload
        const { userName, role } = decoded
        const isUserExist = await User.findOne({ userName })
        if (!isUserExist) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
        }
        req.user = decoded as JwtPayload & { role: string }
        next()
    })

}

export default auth