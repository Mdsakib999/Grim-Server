import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "./user.interface";

const router = Router()

router.post('/create-user', validateRequest(userValidation.userValidationSchema), userController.createUser)
router.post('/login-user', validateRequest(userValidation.userValidationSchema), userController.userLogin)
router.post('/change-password', userController.userPasswordChange)
router.get('/me', auth(UserRole.customer, UserRole.admin), userController.getMe)

export const userRouter = router