import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { OrderService } from './order.service';

const createOrder: RequestHandler = catchAsync(async (req, res) => {
  const email = req?.user?.email;
  const result = await OrderService.createOrderIntoDB(email, req.body, req.ip!);
  sendResponse(res, {
    success: true,
    message: 'Order placed successfully',
    statusCode: 201,
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderService.verifyPayment(req.query.order_id as string);
  console.log('clg for verify', order);

  sendResponse(res, {
    success: true,
    message: 'Order verified successfully',
    statusCode: 201,
    data: order,
  });
});

const getOrder: RequestHandler = catchAsync(async (req, res) => {
  const result = await OrderService.getOrderFromDB();
  sendResponse(res, {
    success: true,
    message: 'Orders retrieved successfully',
    statusCode: 201,
    data: result,
  });
});

// get order for specific user by using user email
const getOrderForSpecificUser: RequestHandler = catchAsync(async (req, res) => {
  const email = req?.user?.email;

  const result = await OrderService.getOrderFromDBFOrSpecificUser(email);
  sendResponse(res, {
    success: true,
    message: 'Orders retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

const getSingleOrder: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userEmail = req?.user?.email;
  const result = await OrderService.getSingleOrderFromDb(id, userEmail);
  sendResponse(res, {
    success: true,
    message: 'Order retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

const getAdminSingleOrder: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await OrderService.getAdminSingleOrderFromDb(id);
  sendResponse(res, {
    success: true,
    message: 'Order retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

const calculateRevenue: RequestHandler = catchAsync(async (req, res) => {
  const result = await OrderService.calculateTotalRevenue();
  sendResponse(res, {
    success: true,
    message: 'Revenue calculated successfully',
    statusCode: 200,
    data: result,
  });
});

const updateOrder: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;
  const result = await OrderService.updateOrderStatus(id, orderStatus);
  sendResponse(res, {
    success: true,
    message: 'Order updated successfully',
    statusCode: 200,
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  verifyPayment,
  getOrder,
  getOrderForSpecificUser,
  getSingleOrder,
  calculateRevenue,
  getAdminSingleOrder,
  updateOrder,
};
