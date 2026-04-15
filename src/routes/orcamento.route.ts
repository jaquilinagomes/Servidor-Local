import { Router } from "express";
import {} from "../controllers/prestador.controller.js";
import { OrcamentoController } from "../controllers/orcamento.controller.js";
import AuthMilddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const OrcamentoRoute = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(OrcamentoRoute.getById, authorize([]), OrcamentoController.get)

router.use(AuthMilddleware)

router.get(OrcamentoRoute.getAll, authorize([Role.ADMIN]), OrcamentoController.getAll)

router.post(OrcamentoRoute.create, authorize([Role.ADMIN, Role.CLIENTE]), OrcamentoController.create)

router.put(OrcamentoRoute.update, authorize([Role.ADMIN, Role.CLIENTE]), OrcamentoController.update)

router.delete(OrcamentoRoute.delete, authorize([Role.ADMIN]), OrcamentoController.delete)

export { router };