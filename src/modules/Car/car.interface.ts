/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TCar = {
  image: string;
  brand: string;
  carName: string;
  model: string;
  year: number;
  price: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  description: string;
  quantity: number;
  milage: string;
  fuelType: string;
  inStock: boolean;
};

export interface TCarModel extends Model<TCar> {
  isCarExists(id: string): Promise<TCar>;
}
