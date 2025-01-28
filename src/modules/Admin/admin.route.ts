import express from 'express';
import { AdminController } from './admin.controller';
import auth from '../../app/middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.patch(
  '/users/:id/block',
  auth(USER_ROLE.admin),
  AdminController.blockUserFromDB,
);

router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  AdminController.deleteBlogFromDB,
);

export const AdminRoutes = router;
