import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";
import AuthMilddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const UserRoute = {
    create: "/create",
    getAll: "/",
    getById:"/get-by-id/:id",
    update:"/update/:id",
    delete:"/delete/:id",
    login: "/login",
    updatePassword: "/update-password/:id"
}
const router = Router()

router.post(UserRoute.login, UserController.login)

router.post(UserRoute.create, UserController.create)

router.use(AuthMilddleware)

router.get(UserRoute.getAll, authorize([Role.ADMIN]), UserController.getAll)

router.get(UserRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role. PRESTADOR, Role.EMPRESA]), UserController.get)

router.put(UserRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role. PRESTADOR, Role.EMPRESA]), UserController.update)

router.delete(UserRoute.update, authorize([Role.ADMIN]), UserController.delete)

router.put(UserRoute.updatePassword, authorize([Role.ADMIN, Role.CLIENTE, Role. PRESTADOR, Role.EMPRESA]), UserController.updatePassword)

export { router };