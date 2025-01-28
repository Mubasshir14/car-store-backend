import { RequestHandler } from 'express';
import sendResponse from '../../app/utils/sendResponse';
import { ReviewService } from './review.service';
import catchAsync from '../../app/utils/catchAsync';

const createReview: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReviewService.createReviewIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'Review Fetched successfully',
    statusCode: 200,
    data: result,
  });
});

const getReview: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReviewService.getReviewIntoDB();
  sendResponse(res, {
    success: true,
    message: 'Review fetched successfully',
    statusCode: 200,
    data: result,
  });
});
const getProductReview: RequestHandler = catchAsync(async (req, res) => {
  const {id} = req.params
  const result = await ReviewService.getProductReviewIntoDB(id);
  sendResponse(res, {
    success: true,
    message: 'Review fetched successfully',
    statusCode: 200,
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getReview,
  getProductReview
};
