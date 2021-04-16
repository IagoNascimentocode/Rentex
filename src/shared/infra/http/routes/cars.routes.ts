import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationController();

const carsRouter = Router();

carsRouter.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRouter.get("/available", listAvailableCarsController.handle)

carsRouter.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationsController.handle)

export { carsRouter }