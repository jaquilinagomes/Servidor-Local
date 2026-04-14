import { Router } from "express";
import { ServicoController } from "../controllers/servico.controller.js";
import { authorize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";

const ServiceRoute = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllDetailed: "/all-detailed"
}

const router = Router()

router.post(ServiceRoute.create, authorize([Role.ADMIN]), ServicoController.create)

router.get(ServiceRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), ServicoController.getAll)

router.get(ServiceRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), ServicoController.get)

router.put(ServiceRoute.update, authorize([Role.ADMIN]), ServicoController.update)

router.delete(ServiceRoute.delete, authorize([Role.ADMIN]), ServicoController.delete)

router.get(ServiceRoute.getAllDetailed, ServicoController.getAllServicoDetalhado)

export { router };