import { Router } from "express";

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ensureAdmin } from "../middlewares/ensuredAdmin";
import { ensuredAuthenticated } from "../middlewares/ensuredAuthenticated";

const createCarController = new CreateCarController();

const carsRouter = Router();

carsRouter.post("/", ensuredAuthenticated, ensureAdmin, createCarController.handle);

export { carsRouter }