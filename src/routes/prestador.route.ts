import { Router } from "express";
import { prestadorController } from "../controllers/prestador.controller.js";

const PrestadorRoute = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(PrestadorRoute.getAll, prestadorController.getAll)
router.get(PrestadorRoute.getById, prestadorController.get)
router.post(PrestadorRoute.create, prestadorController.create)
router.put(PrestadorRoute.update, prestadorController.update)
router.delete(PrestadorRoute.delete, prestadorController.delete)

export { router };