import express from 'express';
import auth from '../../app/middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { CartController } from './cart.controller';
const router = express.Router();

router.post('/', auth(USER_ROLE.user), CartController.addToCart);

router.get(
  '/',
  auth(USER_ROLE.user),
  CartController.getOrderForSpecificUser,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user),
  CartController.removeCartItem,
);

router.delete(
  '/',
  auth(USER_ROLE.user),
  CartController.removeAllCartItem,
);

export const CartRoutes = router;
