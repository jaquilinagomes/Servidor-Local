import { Router } from "express";
import {} from "../controllers/prestador.controller.js";
import { OrcamentoController } from "../controllers/orcamento.controller.js";
import AuthMilddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const OrcamentoRoute = {
    create: "/create",
    get:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    calcularOrcamento:"/calcular/:id"
}

const router = Router()

router.use(AuthMilddleware)

router.get(OrcamentoRoute.get, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), OrcamentoController.get)

router.get(OrcamentoRoute.getAll, authorize([Role.ADMIN]), OrcamentoController.getAll)

router.post(OrcamentoRoute.create, authorize([Role.ADMIN, Role.CLIENTE]), OrcamentoController.create)

router.put(OrcamentoRoute.update, authorize([Role.ADMIN]), OrcamentoController.update)

router.delete(OrcamentoRoute.delete, authorize([Role.ADMIN]), OrcamentoController.delete)

router.put(OrcamentoRoute.calcularOrcamento, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), OrcamentoController.calculateBudget)

export { router };