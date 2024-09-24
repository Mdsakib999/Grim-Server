import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";

const router = Router()

router.post('/create-user', validateRequest(userValidation.userValidationSchema), userController.createUser)
router.post('/login-user', validateRequest(userValidation.userValidationSchema), userController.getMe)

export const userRouter = router