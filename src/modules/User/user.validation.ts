import { z } from 'zod';

export const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(4, {
        message: 'Name is required and must conatin at least 4 characters .',
      })
      .max(200, { message: 'Name must not exceed 100 characters.' })
      .regex(/^[a-zA-Z\s]+$/, {
        message: 'Name can only contain letters and spaces.',
      }),

    email: z
      .string()
      .trim()
      .email({ message: 'Invalid email address.' })
      .min(1, { message: 'Email is required' })
      .max(100, { message: 'Email must not exceed 100 characters.' }),

    password: z.string().trim().min(4, {
      message:
        'Password is required and must be length of it at least 4 characters',
    }),

    role: z
      .enum(['admin', 'user'], {
        errorMap: () => ({ message: "Role must be either 'admin' or 'user'." }),
      })
      .optional()
      .default('user'),

    isBlocked: z.boolean().optional().default(false),
  }),
});

export const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email({ message: 'Invalid email address.' })
      .min(1, { message: 'Email is required' })
      .max(100, { message: 'Email must not exceed 100 characters.' }),

    password: z.string().trim().min(4, {
      message:
        'Password is required and must be length of it at least 4 characters',
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required!',
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required!',
    }),
    newPassword: z.string({
      required_error: 'User password is required!',
    }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookie: z.object({
    refreshToken: z
      .string({
        // required_error: 'Refresh token is required!',
      })
      .optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
  loginUserValidationSchema,
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
  refreshTokenValidationSchema,
};
