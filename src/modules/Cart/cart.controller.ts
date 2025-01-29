import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { CartServices } from './cart.service';

const addToCart: RequestHandler = catchAsync(async (req, res) => {
  const result = await CartServices.addToCart(req.body);
  sendResponse(res, {
    success: true,
    message: 'Item added to cart successfully!',
    statusCode: 201,
    data: result,
  });
});

const getOrderForSpecificUser: RequestHandler = catchAsync(async (req, res) => {
  const email = req?.user?.email;

  const result = await CartServices.getCartFromDBFOrSpecificUser(email);
  console.log(result);
  sendResponse(res, {
    success: true,
    message: 'Orders retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

const removeCartItem: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const email = req?.user?.email;
  const result = await CartServices.removeCartItem(id, email);

  sendResponse(res, {
    success: true,
    message: 'Item removed from cart successfully!',
    statusCode: 200,
    data: result,
  });
});

const removeAllCartItem: RequestHandler = catchAsync(async (req, res) => {
  const email = req?.user?.email;
  const result = await CartServices.removeAllCartItemFromD(email);

  sendResponse(res, {
    success: true,
    message: 'Item removed from cart successfully!',
    statusCode: 200,
    data: result,
  });
});

const updateCart: RequestHandler = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const result = await CartServices.updateSingleCart(id, req.body);
  console.log('Cart update', result);
  sendResponse(res, {
    success: true,
    message: 'Cart updated successfully',
    statusCode: 200,
    data: result,
  });
});

export const CartController = {
  addToCart,
  getOrderForSpecificUser,
  removeCartItem,
  removeAllCartItem,
  updateCart
};
