/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';
import config from '../../app/config';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../app/utils/sendEmails';

const userRegistrationIntoDB = async (payload: TUser) => {
  if (await User.isUserExists(payload.email)) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists');
  }
  const result = await User.create(payload);
  return result;
};

const userLoginIntoDB = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password!');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const userLogoutFromDB = async (token: string) => {
  return true;
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExists(userData.email);
  console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  try {
    const decoded = verifyToken(token, config.jwt_refresh_secret as string);
    console.log('Decoded Token:', decoded); // Add this to check if decoding works
    const { email, role, iat } = decoded;
    const user = await User.isUserExists(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    const jwtPayload = {
      email: user.email,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    console.log('Access Token:', accessToken); // This will now be logged
    return {
      accessToken,
    };
  } catch (error) {
    console.error('Error in refreshToken:', error);
    throw error;
  }
};


const forgetPassword = async (email: string) => {
  const user = await User.isUserExists(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken}`;
  sendEmail(user.email, resetUILink);
  console.log(resetUILink);
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExists(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  if (payload.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: decoded.email,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
    },
  );
};

const getMe = async (email: string, role: string) => {
  let result = null;
  if (role === 'admin') {
    result = await User.findOne({ email: email });
  }

  if (role === 'user') {
    result = await User.findOne({ email: email });
  }

  return result;
};

const getUserFromDB = async () => {
  const result = await User.find();
  return result;
};

export const AuthUserService = {
  userRegistrationIntoDB,
  userLoginIntoDB,
  userLogoutFromDB,
  changePassword,
  forgetPassword,
  resetPassword,
  refreshToken,
  getMe,
  getUserFromDB,
};
