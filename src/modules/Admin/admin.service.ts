/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { User } from '../User/user.model';
// import { Blog } from '../Blogs/blog.model';

const blockUserFromDB = async (id: string) => {
  const user = await User.findUserById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  if (user?.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is blocked!');
  }
  await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
};

const deleteBlogFromDBByAdmin = async (id: string) => {
  // const blog = await Blog.isBlogExists(id);
  // if (!blog) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
  // }
  // await Blog.findByIdAndDelete(id);
};

export const AdminService = {
  blockUserFromDB,
  deleteBlogFromDBByAdmin,
};
