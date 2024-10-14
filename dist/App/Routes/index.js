"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const product_route_1 = require("../modules/GrimProduct/product.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.userRouter
    },
    {
        path: '/product',
        route: product_route_1.productRoute
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
