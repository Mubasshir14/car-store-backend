import mongoose, { Schema, model } from 'mongoose';

export interface ICart {
  user: string;
  car: Schema.Types.ObjectId;
  quantity: number;
  price: number;
  totalPrice: number;
  name: string;
  brand: string;
  category: string;
  description: string;
  fuelType: string;
  image: string;
  inStock: boolean;
  milage: string;
  year: number;
  userName: string;
  email: string;
  address: string;
  phone: string;
  city: string;
}

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  fuelType: {
    type: String,
  },
  image: {
    type: String,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  milage: {
    type: String,
  },
  year: {
    type: Number,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
});

export const Cart = model<ICart>('Cart', cartSchema);
