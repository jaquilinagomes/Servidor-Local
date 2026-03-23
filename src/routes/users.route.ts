import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";

const UsersRoute = {
    create: "/create",
    getAll: "/",
    getById:"/get-user-by-id/:id",
    update:"/update/:id",
    delete:"/delete/:id"
}
const router = Router()

router.get(UsersRoute.getAll, UsersController.getAll)
router.get(UsersRoute.getById, UsersController.get)
router.post(UsersRoute.create, UsersController.create)
router.put(UsersRoute.update, UsersController.update)
router.delete(UsersRoute.update, UsersController.delete)

export { router };