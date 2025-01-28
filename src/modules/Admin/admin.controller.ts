import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { AdminService } from './admin.service';

const blockUserFromDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await AdminService.blockUserFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
    data: result,
  });
});

const deleteBlogFromDB: RequestHandler = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const result = await AdminService.deleteBlogFromDBByAdmin(id);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
    data: result,
  });
});

export const AdminController = {
  blockUserFromDB,
  deleteBlogFromDB,
};
