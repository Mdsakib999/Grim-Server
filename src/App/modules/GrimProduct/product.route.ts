import { Router } from "express";
import { productControllers } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { productValidation } from "./product.validation";



const router = Router()



router.get('/getProduct', productControllers.getProductByCategory)
router.post('/create-product', validateRequest(productValidation.productValidationSchema), productControllers.createProduct)


export const productRoute = router