import { Router } from "express";
import { userRouter } from "../modules/User/user.route";
import { productRoute } from "../modules/GrimProduct/product.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/product',
        route: productRoute
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router