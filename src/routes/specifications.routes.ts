import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

import { ensuredAuthenticated } from '../middlewares/ensuredAuthenticated';


const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController()


specificationRoutes.use(ensuredAuthenticated)
specificationRoutes.post("/", createSpecificationController.handle)

export { specificationRoutes }