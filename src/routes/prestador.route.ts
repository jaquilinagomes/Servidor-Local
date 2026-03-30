import { Router } from "express";
import { prestadorController } from "../controllers/prestador.controller.js";

const PrestadorRouter = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(PrestadorRouter.getAll, prestadorController.getAll)
router.get(PrestadorRouter.getById, prestadorController.get)
router.post(PrestadorRouter.create, prestadorController.create)
router.put(PrestadorRouter.update, prestadorController.update)
router.delete(PrestadorRouter.delete, prestadorController.delete)

export { router };