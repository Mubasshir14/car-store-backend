import { Types } from 'mongoose';

export type TReview = {
  product: Types.ObjectId;
  reviewText: string;
  email?: string;
  name: string;
  model: string;
  image: string;
  rating: number;
};
