import express from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../app/middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../app/middlewares/validateRequest';
import { Ordervalidation } from './order.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(Ordervalidation.createOrderValidationSchema),
  OrderControllers.createOrder,
);
router.get('/verify', auth(USER_ROLE.user), OrderControllers.verifyPayment);

router.get('/', auth(USER_ROLE.admin), OrderControllers.getOrder);
router.get(
  '/my-order',
  auth(USER_ROLE.user),
  OrderControllers.getOrderForSpecificUser,
);
router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  OrderControllers.getSingleOrder,
);
router.get(
  '/admin/:id',
  auth(USER_ROLE.admin),
  OrderControllers.getAdminSingleOrder,
);
router.get(
  '/revenue',
  auth(USER_ROLE.admin),
  OrderControllers.calculateRevenue,
);

router.patch(
  '/:id/status',
  auth(USER_ROLE.admin),
  OrderControllers.updateOrder,
);

export const OrderRoutes = router;
