import express from 'express';
import { CarControllers } from './car.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { CarValidation } from './car.validation';
import auth from '../../app/middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.createCarValidationSchema),
  CarControllers.createCar,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.updateCarValidationSchema),
  CarControllers.updateCar,
);
router.delete('/:id', auth(USER_ROLE.admin), CarControllers.deleteSingleCar);
router.get('/', CarControllers.getCar);
router.get('/:id', CarControllers.getSingleCar);

export const CarRoutes = router;
