import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalRouter } from './rental.routes';
import { specificationRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes'


const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRouter);
router.use("/rentals", rentalRouter);
router.use("/password", passwordRoutes)
router.use(authenticateRoutes);

export { router }