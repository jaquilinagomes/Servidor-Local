import { Router } from "express"
import AuthMilddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { EmpresaController } from "../controllers/empresa.controller.js"
import { Role } from "../utils/types.js"
import { EmpresaModel } from "../models/empresa.model.js"

const EmpresaRoute = {
    create: "/create",
    getAll: "/",
    get:"/get-by-id/:id",
    update:"/update/:id",
    delete:"/delete/:id",
}

const router = Router()

router.use(AuthMilddleware)

router.get(EmpresaRoute.get, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), EmpresaController.get)

router.get(EmpresaRoute.getAll, authorize([Role.ADMIN]), EmpresaController.getAll)

router.post(EmpresaRoute.create, authorize([Role.ADMIN, Role.CLIENTE]), EmpresaController.create)

router.put(EmpresaRoute.update, authorize([Role.ADMIN]), isOwner(EmpresaModel, "owner"), EmpresaController.update)

router.delete(EmpresaRoute.delete, authorize([Role.ADMIN]),isOwner(EmpresaModel, "owner"), EmpresaController.delete)

export { router };