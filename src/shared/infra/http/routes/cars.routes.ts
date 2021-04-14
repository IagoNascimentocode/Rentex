import { Router } from "express";

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createCarController = new CreateCarController();

const carsRouter = Router();

carsRouter.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

export { carsRouter }