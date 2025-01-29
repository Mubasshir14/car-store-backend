import { z } from 'zod';

export const createCarValidationSchema = z.object({
  body: z.object({
    brand: z
      .string()
      .min(4, { message: 'Brand Name must contain at least 4 characters' })
      .max(30, { message: 'Brand Name cannot exceed 30 characters' })
      .nonempty({ message: 'Brand Name is required' }),
    model: z
      .string()
      .min(4, { message: 'Model Name must contain at least 4 characters' })
      .max(30, { message: 'Model Name cannot exceed 30 characters' })
      .nonempty({ message: 'Model Name is required' }),
    image: z.string(),
    year: z
      .number()
      .max(new Date().getFullYear(), {
        message: 'Year cannot be greater than the current year',
      })
      .nonnegative({ message: 'Year is required' }),
    price: z
      .number()
      .min(1, { message: 'Price must be greater than zero' })
      .nonnegative({ message: 'Price is required' }),
    category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
      errorMap: (issue) => ({
        message: `${issue.message}. Choose from 'Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'`,
      }),
    }),
    milage: z.string(),
    fuelType: z.string(),
    description: z
      .string()
      .min(20, { message: 'Description must contain at least 20 characters' })
      .max(1000, { message: 'Description cannot exceed 1000 characters' })
      .nonempty({ message: 'Description is required' }),
    quantity: z
      .number()
      .min(0, { message: 'Quantity cannot be negative' })
      .nonnegative({ message: 'Quantity is required' }),
    inStock: z.boolean().default(true),
  }),
});

export const updateCarValidationSchema = z.object({
  body: z.object({
    brand: z
      .string()
      .min(1, { message: 'Brand Name must contain at least 1 characters' })
      .max(30, { message: 'Brand Name cannot exceed 30 characters' })
      .nonempty({ message: 'Brand Name is required' })
      .optional(),
    image: z.string().optional(),
    model: z
      .string()
      .min(1, { message: 'Model Name must contain at least 1 characters' })
      .max(30, { message: 'Model Name cannot exceed 30 characters' })
      .nonempty({ message: 'Model Name is required' })
      .optional(),
    year: z
      .number()
      .max(new Date().getFullYear(), {
        message: 'Year cannot be greater than the current year',
      })
      .nonnegative({ message: 'Year is required' })
      .optional(),
    price: z
      .number()
      .min(1, { message: 'Price must be greater than zero' })
      .nonnegative({ message: 'Price is required' })
      .optional(),
    category: z
      .enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
        errorMap: (issue) => ({
          message: `${issue.message}. Choose from 'Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'`,
        }),
      })
      .optional(),
    milage: z.string().optional(),
    fuelType: z.string().optional(),
    description: z
      .string()
      .min(20, { message: 'Description must contain at least 20 characters' })
      .max(1000, { message: 'Description cannot exceed 1000 characters' })
      .nonempty({ message: 'Description is required' })
      .optional(),
    quantity: z
      .number()
      .min(0, { message: 'Quantity cannot be negative' })
      .nonnegative({ message: 'Quantity is required' })
      .optional(),
    inStock: z.boolean().default(true),
  }),
});

export const CarValidation = {
  createCarValidationSchema,
  updateCarValidationSchema,
};
