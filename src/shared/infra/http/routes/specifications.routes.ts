import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { Router } from 'express';
import { ensuredAuthenticated } from '../middlewares/ensuredAuthenticated';






const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController()


specificationRoutes.use(ensuredAuthenticated)
specificationRoutes.post("/", createSpecificationController.handle)

export { specificationRoutes }