import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsUserController = new ListRentalsByUserController();

rentalRouter.post("/", ensureAuthenticated, createRentalController.handle)
rentalRouter.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle)

rentalRouter.get("/user", ensureAuthenticated, listRentalsUserController.handle)

export { rentalRouter }
