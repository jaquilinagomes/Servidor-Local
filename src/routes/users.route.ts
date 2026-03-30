import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";

const UserRouter = {
    create: "/create",
    getAll: "/",
    getById:"/get-by-id/:id",
    update:"/update/:id",
    delete:"/delete/:id"
}
const router = Router()

router.get(UserRouter.getAll, UserController.getAll)
router.get(UserRouter.getById, UserController.get)
router.post(UserRouter.create, UserController.create)
router.put(UserRouter.update, UserController.update)
router.delete(UserRouter.update, UserController.delete)

export { router };