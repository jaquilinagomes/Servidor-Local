import { Router } from "express";
import { prestacaoServicoController } from "../controllers/prestacao-servico.controller.js";

const PrestacaoServicoRoute = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(PrestacaoServicoRoute.getAll, prestacaoServicoController.getAll)
router.get(PrestacaoServicoRoute.getById, prestacaoServicoController.get)
router.post(PrestacaoServicoRoute.create, prestacaoServicoController.create)
router.put(PrestacaoServicoRoute.update, prestacaoServicoController.update)
router.delete(PrestacaoServicoRoute.delete, prestacaoServicoController.delete)

export { router };