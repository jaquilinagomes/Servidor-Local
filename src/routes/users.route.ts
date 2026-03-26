import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";

const UserRouter = {
    create: "/create",
    getAll: "/",
    getById:"/get-by-id/:id",
    update:"/update/:id",
    delete:"/delete/:id"
}
const router = Router()

router.get(UserRouter.getAll, UsersController.getAll)
router.get(UserRouter.getById, UsersController.get)
router.post(UserRouter.create, UsersController.create)
router.put(UserRouter.update, UsersController.update)
router.delete(UserRouter.update, UsersController.delete)

export { router };