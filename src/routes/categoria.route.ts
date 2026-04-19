import { Router } from "express"
import AuthMilddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { CategoriaController } from "../controllers/categoria.controller.js"
import { Role } from "../utils/types.js"
import { CategoriaModel } from "../models/categoria.model.js"

const CategoriaRoute = {
    create: "/create",
    getAll: "/",
    get:"/get-by-id/:id",
    update:"/update/:id",
    delete:"/delete/:id",
}

const router = Router()

router.use(AuthMilddleware)

router.get(CategoriaRoute.get, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), CategoriaController.get)

router.get(CategoriaRoute.getAll, authorize([Role.ADMIN]), CategoriaController.getAll)

router.post(CategoriaRoute.create, authorize([Role.ADMIN, Role.CLIENTE]), CategoriaController.create)

router.put(CategoriaRoute.update, authorize([Role.ADMIN]), isOwner(CategoriaModel, "owner"), CategoriaController.update)

router.delete(CategoriaRoute.delete, authorize([Role.ADMIN]), isOwner(CategoriaModel, "owner"), CategoriaController.delete)

export { router };