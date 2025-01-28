import express from 'express';
import auth from '../../app/middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { ReviewController } from './review.controller';
const router = express.Router();

router.post('/', auth(USER_ROLE.user), ReviewController.createReview);
router.get('/', ReviewController.getReview);

export const ReviewRoutes = router;
