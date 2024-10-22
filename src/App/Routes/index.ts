import { Router } from "express";
import { userRouter } from "../modules/User/user.route";
import { productRoute } from "../modules/GrimProduct/product.route";
import { postRouter } from "../modules/Post/post.route";
import { categoryRouter } from "../modules/Category/category.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/product',
        route: productRoute
    },
    {
        path: '/post',
        route: postRouter
    },
    {
        path: '/category',
        route: categoryRouter
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router