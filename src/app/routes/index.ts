import { Router } from 'express';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { AdminRoutes } from '../../modules/Admin/admin.route';
import { CarRoutes } from '../../modules/Car/car.route';
import { OrderRoutes } from '../../modules/Order/order.route';
import { CartRoutes } from '../../modules/Cart/cart.route';
import { ReviewRoutes } from '../../modules/Review/review.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/car',
    route: CarRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
