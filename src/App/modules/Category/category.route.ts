import { Router } from "express";
import { categoryControllers } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidations } from "./category.validation";



const router = Router()

router.get('/getAll-category', categoryControllers.getAllCategory)
router.patch('/update-category/:id', categoryControllers.editCategory)
router.delete('/delete-category/:id', categoryControllers.deleteCategory)
router.post('/create-subCategory/:id', categoryControllers.createSubCategory)
router.patch('/delete-subCategory/:id', categoryControllers.deleteSubCategory)
router.post('/create-category', validateRequest(categoryValidations.categoryValidationSchema), categoryControllers.createCategory)

export const categoryRouter = router