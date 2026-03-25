import { Router } from "express";
import {} from "../controllers/prestador.controller.js";
import { OrcamentoController } from "../controllers/orcamento.controller.js";

const OrcamentoRoute = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(OrcamentoRoute.getAll, OrcamentoController.getAll)
router.get(OrcamentoRoute.getById, OrcamentoController.get)
router.post(OrcamentoRoute.create, OrcamentoController.create)
router.put(OrcamentoRoute.update, OrcamentoController.update)
router.delete(OrcamentoRoute.delete, OrcamentoController.delete)

export { router };