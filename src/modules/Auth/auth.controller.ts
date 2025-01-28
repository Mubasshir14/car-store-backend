import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { AuthUserService } from './auth.service';
import httpStatus from 'http-status';
import config from '../../app/config';
import AppError from '../../app/errors/AppError';

const userRegistration: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthUserService.userRegistrationIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: result,
  });
});

const userLogin: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthUserService.userLoginIntoDB(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,

    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in successfully.',
    data: accessToken,
  });
});

const userLogout: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    sendResponse(res, {
      success: false,
      message: 'No token provided',
      statusCode: 400,
      data: '',
    });
    return;
  }

  await AuthUserService.userLogoutFromDB(token);
  res.clearCookie('token', { httpOnly: true, secure: true });
  sendResponse(res, {
    success: true,
    message: 'Logout successful',
    statusCode: 200,
    data: '',
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthUserService.changePassword(req.user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);
  const result = await AuthUserService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const email = req.body.email;
  const result = await AuthUserService.forgetPassword(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !');
  }

  const result = await AuthUserService.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset succesfully!',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { email, role } = req.user;
  const result = await AuthUserService.getMe(email, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const result = await AuthUserService.getUserFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

export const AuthUserController = {
  userRegistration,
  userLogin,
  userLogout,
  changePassword,
  resetPassword,
  forgetPassword,
  refreshToken,
  getMe,
  getUser,
};
