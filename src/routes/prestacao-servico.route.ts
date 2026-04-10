import { Router } from "express";
import { prestacaoServicoController } from "../controllers/prestacao-servico.controller.js";
import { prestadorController } from "../controllers/prestador.controller.js";

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
router.post(PrestacaoServicoRoute.create, prestacaoServicoController.create)
router.put(PrestacaoServicoRoute.update, prestacaoServicoController.update)
router.delete(PrestacaoServicoRoute.delete, prestacaoServicoController.delete)
router.get(PrestacaoServicoRoute.getAllPrestacaoServicoDetalhada, prestacaoServicoController.getAllPrestacaoServicoDetalhada)

export { router };