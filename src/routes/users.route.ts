import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";
import AuthMilddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const UserRoute = {
    create: "/create",
    getAll: "/",
    get:"/get-by-id/:id",
    update:"/update/:id",
    delete:"/delete/:id",
    login: "/login",
    resetPassword: "/reset-password/:id"
}

const router = Router()

router.post(UserRoute.login, UserController.login)

router.post(UserRoute.create, UserController.create)

router.use(AuthMilddleware)

router.get(UserRoute.getAll, authorize([Role.ADMIN]), UserController.getAll)

router.get(UserRoute.get, authorize([Role.ADMIN, Role.CLIENTE, Role. PRESTADOR, Role.EMPRESA]), UserController.get)

router.put(UserRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role. PRESTADOR, Role.EMPRESA]), UserController.update)

router.delete(UserRoute.delete, authorize([Role.ADMIN]), UserController.delete)

router.put(UserRoute.resetPassword, authorize([Role.ADMIN, Role.CLIENTE, Role. PRESTADOR, Role.EMPRESA]), UserController.resetPassword)

export { router };