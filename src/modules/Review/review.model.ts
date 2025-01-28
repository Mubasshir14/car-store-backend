import { model, Schema } from 'mongoose';
import { TReview } from './review.interface';

const ReviewSchema: Schema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    model: {
      type: String,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<TReview>('Review', ReviewSchema);
