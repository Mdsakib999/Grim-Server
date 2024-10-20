import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { postValidation } from "./post.validation";
import { postController } from "./post.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../User/user.interface";




const router = Router()

router.post('/create-post', auth(UserRole.admin), validateRequest(postValidation.postValidationSchema), postController.createPost)
router.patch('/update-post/:id', auth(UserRole.admin), validateRequest(postValidation.postValidationSchema), postController.updatePost)
router.get('/getPost', auth(UserRole.admin, UserRole.customer), postController.getAllPost)
router.delete('/:id', auth(UserRole.admin), postController.deletePost)
export const postRouter = router