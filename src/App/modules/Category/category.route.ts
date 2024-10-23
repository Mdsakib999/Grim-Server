import { Router } from "express";
import { categoryControllers } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidations } from "./category.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "../User/user.interface";



const router = Router()

router.post('/create-category', auth(UserRole.admin), validateRequest(categoryValidations.categoryValidationSchema), categoryControllers.createCategory)
router.get('/getAll-category', auth(UserRole.admin, UserRole.customer), categoryControllers.getAllCategory)
router.patch('/update-category/:id', auth(UserRole.admin), categoryControllers.editCategory)
router.delete('/delete-category/:id', auth(UserRole.admin), categoryControllers.deleteCategory)
router.post('/create-subCategory/:id', auth(UserRole.admin), categoryControllers.createSubCategory)
router.patch('/delete-subCategory/:id', auth(UserRole.admin), categoryControllers.deleteSubCategory)
router.patch('/update-subCategory/:id', auth(UserRole.admin), categoryControllers.updateSubCategory)

export const categoryRouter = router