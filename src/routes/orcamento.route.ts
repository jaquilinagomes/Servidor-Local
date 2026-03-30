import { Router } from "express";
import {} from "../controllers/prestador.controller.js";
import { OrcamentoController } from "../controllers/orcamento.controller.js";

const OrcamentoRouter = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(OrcamentoRouter.getAll, OrcamentoController.getAll)
router.get(OrcamentoRouter.getById, OrcamentoController.get)
router.post(OrcamentoRouter.create, OrcamentoController.create)
router.put(OrcamentoRouter.update, OrcamentoController.update)
router.delete(OrcamentoRouter.delete, OrcamentoController.delete)

export { router };