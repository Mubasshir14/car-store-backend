import { z } from 'zod';
import mongoose from 'mongoose';

export const createOrderValidationSchema = z.object({
  body: z.object({
    cars: z.array(
      z.object({
        car: z
          .string()
          .refine((value) => mongoose.Types.ObjectId.isValid(value), {
            message: 'Invalid Car ID',
          }),
        quantity: z
          .number()
          .min(1, { message: 'Quantity cannot be less than 1' }),
      }),
    ),
  }),
});

export const Ordervalidation = {
  createOrderValidationSchema,
};
