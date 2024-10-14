import { Router } from "express";
import { productControllers } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { productValidation } from "./product.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "../User/user.interface";



const router = Router()



router.get('/getProduct', auth(UserRole.admin), productControllers.getProductByCategory)
router.post('/create-product', auth(UserRole.admin), validateRequest(productValidation.productValidationSchema), productControllers.createProduct)
router.get('/getAllProduct', auth(UserRole.admin), productControllers.getAllProduct)
router.patch('/editProduct/:id', auth(UserRole.admin),
    validateRequest(productValidation.productEditValidationSchema),
    productControllers.editProduct)

router.delete('/:id', auth(UserRole.admin), productControllers.deleteProduct)

export const productRoute = router