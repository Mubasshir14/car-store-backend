import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { Cart } from './cart.model';

/* eslint-disable @typescript-eslint/no-explicit-any */
const addToCart = async (data: any) => {
  const {
    user,
    car,
    quantity,
    price,
    name,
    brand,
    category,
    description,
    fuelType,
    image,
    inStock,
    milage,
    year,
    userName,
    email,
    address,
    phone,
    city,
  } = data;

  const totalPrice = price * quantity;

  const cartItem = await Cart.create({
    user,
    car,
    quantity,
    price,
    totalPrice,
    name,
    brand,
    category,
    description,
    fuelType,
    image,
    inStock,
    milage,
    year,
    userName,
    email,
    address,
    phone,
    city,
  });

  return cartItem;
};

const getCartFromDBFOrSpecificUser = async (email: string) => {
  const result = await Cart.find({ email });

  if (result.length === 0) {
    throw new Error('No items found for this user');
  }

  return result;
};

const removeCartItem = async (id: string, email: string) => {
  const cartItem = await Cart.findOne({ _id: id });

  if (!cartItem) {
    throw new Error('Item not found');
  }

  if (cartItem.email !== email) {
    throw new Error('You can only delete your own items');
  }
  await Cart.deleteOne({ _id: id });

  return { message: 'Item deleted successfully' };
};

const removeAllCartItemFromD = async (email: string) => {
  const cartItems = await Cart.find({ email: email });

  if (!cartItems || cartItems.length === 0) {
    throw new Error('No cart items found for this user');
  }
  await Cart.deleteMany({ email: email });
  return { message: 'All cart items deleted successfully' };
};

const updateSingleCart = async (id: string, payload: any) => {
  const car = await Cart.findById(id);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found!');
  }
  const result = await Cart.findByIdAndUpdate(id, payload, {
    new: true,
  });
  console.log(result);
  return result;
};

export const CartServices = {
  addToCart,
  getCartFromDBFOrSpecificUser,
  removeCartItem,
  removeAllCartItemFromD,
  updateSingleCart
};
