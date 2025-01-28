import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};
const getReviewIntoDB = async () => {
  const result = await Review.find();
  return result;
};

const getProductReviewIntoDB = async (id: string) => {
  try {
    const reviews = await Review.find({ product: id });
    if (reviews.length === 0) {
      return { message: 'No reviews found for this product.' };
    }
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return { message: 'An error occurred while fetching reviews.' };
  }
};
export const ReviewService = {
  createReviewIntoDB,
  getReviewIntoDB,
  getProductReviewIntoDB,
};
