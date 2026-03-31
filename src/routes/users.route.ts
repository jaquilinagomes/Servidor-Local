import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";
import AuthMilddleware from "../security/auth.middleware.js";

const UserRoute = {
    create: "/create",
    getAll: "/",
    getById:"/get-by-id/:id",
    update:"/update/:id",
    delete:"/delete/:id",
    login: "/login"
}
const router = Router()

router.get(UserRoute.getAll, AuthMilddleware, UserController.getAll)
router.get(UserRoute.getById, UserController.get)
router.post(UserRoute.create, UserController.create)
router.put(UserRoute.update, UserController.update)
router.delete(UserRoute.update, UserController.delete)
router.post(UserRoute.login, UserController.login)

export { router };