import { Router } from "express";
import { prestacaoServicoController } from "../controllers/prestacao-servico.controller.js";

const PrestacaoServicoRouter = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(PrestacaoServicoRouter.getAll, prestacaoServicoController.getAll)
router.get(PrestacaoServicoRouter.getById, prestacaoServicoController.get)
router.post(PrestacaoServicoRouter.create, prestacaoServicoController.create)
router.put(PrestacaoServicoRouter.update, prestacaoServicoController.update)
router.delete(PrestacaoServicoRouter.delete, prestacaoServicoController.delete)

export { router };