import { Router } from "express";
import { productControllers } from "./product.controller";



const router = Router()



router.get('/getProduct', productControllers.getProductByCategory)


export const productRoute = router