import { Router } from "express";
import { prestacaoServicoController } from "../controllers/prestacao-servico.controller.js";
import AuthMilddleware, { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const PrestacaoServicoRoute = {
    create: "/create",
    get:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllPrestacaoServicoDetalhada: "/get-all-detalhado",
    getAllPrestacaoServicoByCategoria: "/get-all-by-categoria"
}

const router = Router()

router.get(PrestacaoServicoRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), prestacaoServicoController.getAll)

router.get(PrestacaoServicoRoute.get,authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), prestacaoServicoController.get)

router.get(PrestacaoServicoRoute.getAllPrestacaoServicoDetalhada, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), prestacaoServicoController.getAllPrestacaoServicoDetalhada)

router.get(PrestacaoServicoRoute.getAllPrestacaoServicoByCategoria, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), prestacaoServicoController.getAllPrestacaoServicoByCategoria)

router.use(AuthMilddleware)

router.post(PrestacaoServicoRoute.create, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), prestacaoServicoController.create)

router.put(PrestacaoServicoRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), prestacaoServicoController.update)

router.delete(PrestacaoServicoRoute.delete, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA]), prestacaoServicoController.delete)


export { router };