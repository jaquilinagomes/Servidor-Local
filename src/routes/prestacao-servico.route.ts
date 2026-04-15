import { Router } from "express";
import { prestacaoServicoController } from "../controllers/prestacao-servico.controller.js";
import { prestadorController } from "../controllers/prestador.controller.js";
import AuthMilddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const PrestacaoServicoRoute = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllPrestacaoServicoDetalhada: "/get-all-detalhado"
}

const router = Router()

router.get(PrestacaoServicoRoute.getAll, prestacaoServicoController.getAll)

router.get(PrestacaoServicoRoute.getById, prestacaoServicoController.get)

router.use(AuthMilddleware)

router.post(PrestacaoServicoRoute.create, authorize([Role.ADMIN, Role.EMPRESA]), prestacaoServicoController.create)

router.put(PrestacaoServicoRoute.update, authorize([Role.ADMIN]), prestacaoServicoController.update)

router.delete(PrestacaoServicoRoute.delete, authorize([Role.ADMIN]), prestacaoServicoController.delete)

router.get(PrestacaoServicoRoute.getAllPrestacaoServicoDetalhada, prestacaoServicoController.getAllPrestacaoServicoDetalhada)

export { router };