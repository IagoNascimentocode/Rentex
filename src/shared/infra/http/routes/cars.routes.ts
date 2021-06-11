import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import uploadConfig from '@config/upload'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadImages/UploadCarImagesController";

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig)

carsRouter.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRouter.get("/available", listAvailableCarsController.handle)

carsRouter.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationsController.handle)

carsRouter.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImagesController.handle)

export { carsRouter }