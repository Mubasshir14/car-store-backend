/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICartItem {
  car: string;
  quantity: number;
}

export interface ICart {
  user: string;
  cars: {
    car: any;
    quantity: number;
  }[];
  totalPrice: number;
}
