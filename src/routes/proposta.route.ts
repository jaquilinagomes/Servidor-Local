import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"
import AuthMilddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"


const PropostaRoute = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(PropostaRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.EMPRESA, Role.PRESTADOR]), PropostaController.get)

router.use(AuthMilddleware)

router.get(PropostaRoute.getAll, authorize([Role.ADMIN]), PropostaController.getAll)

router.post(PropostaRoute.create, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), PropostaController.create)

router.put(PropostaRoute.update, authorize([Role.ADMIN]), PropostaController.update)

router.delete(PropostaRoute.delete, authorize([Role.ADMIN]), PropostaController.delete)

export { router };