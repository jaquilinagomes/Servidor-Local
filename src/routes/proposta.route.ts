import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"
import AuthMilddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { PropostaModel } from "../models/proposta.model.js"


const PropostaRoute = {
    create: "/create",
    get:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    aceitar: "/aceitar/:id"
}

const router = Router()

router.use(AuthMilddleware)

router.get(PropostaRoute.get, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), PropostaController.get)

router.get(PropostaRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PropostaController.getAll)

router.post(PropostaRoute.create, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), PropostaController.create)

router.put(PropostaRoute.update, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), isOwner(PropostaModel, "owner"), PropostaController.update)

router.delete(PropostaRoute.delete, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), isOwner(PropostaModel, "owner"), PropostaController.delete)

// router.put(PropostaRoute.aceitar, authorize([Role.ADMIN, Role.Cliente]), PropostaController.aceitar)

export { router };