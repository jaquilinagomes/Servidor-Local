import { Router } from "express";
import { prestadorController } from "../controllers/prestador.controller.js";
import AuthMilddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const PrestadorRoute = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(PrestadorRoute.getAll, prestadorController.getAll)

router.get(PrestadorRoute.getById, prestadorController.get)

router.use(AuthMilddleware)

router.post(PrestadorRoute.create, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA]), prestadorController.create)

router.put(PrestadorRoute.update, authorize([Role.ADMIN]), prestadorController.update)

router.delete(PrestadorRoute.delete, authorize([Role.ADMIN]), prestadorController.delete)

export { router };