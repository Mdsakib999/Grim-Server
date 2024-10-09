import { Router } from "express";
import { productControllers } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { productValidation } from "./product.validation";



const router = Router()



router.get('/getProduct', productControllers.getProductByCategory)
router.post('/create-product', validateRequest(productValidation.productValidationSchema), productControllers.createProduct)
router.get('/getAllProduct', productControllers.getAllProduct)
router.patch('/editProduct/:id',
    validateRequest(productValidation.productEditValidationSchema),
    productControllers.editProduct)

router.delete('/:id', productControllers.deleteProduct)

export const productRoute = router