import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"


const PropostaRouter = {
    create: "/create",
    getById:"/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.get(PropostaRouter.getAll, PropostaController.getAll)
router.get(PropostaRouter.getById, PropostaController.get)
router.post(PropostaRouter.create, PropostaController.create)
router.put(PropostaRouter.update, PropostaController.update)
router.delete(PropostaRouter.delete, PropostaController.delete)

export { router };