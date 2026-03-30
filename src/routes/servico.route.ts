import { Router } from "express";
import { ServicoController } from "../controllers/servico.controller.js";

const ServiceRouter = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(ServiceRouter.getAll, ServicoController.getAll)
router.get(ServiceRouter.getById, ServicoController.get)
router.post(ServiceRouter.create, ServicoController.create)
router.put(ServiceRouter.update, ServicoController.update)
router.delete(ServiceRouter.delete, ServicoController.delete)

export { router };