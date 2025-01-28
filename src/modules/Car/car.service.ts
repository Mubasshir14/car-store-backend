/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { TCar } from './car.interface';
import { Car } from './car.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { searchText } from './car.constant';

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const updateSingleCar = async (payload: TCar, id: string) => {
  const car = await Car.isCarExists(id);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found!');
  }
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
  });
  console.log('object', result);
  return result;
};

const deleteSingleCarFromDB = async (id: string) => {
  const car = await Car.isCarExists(id);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found!');
  }
  await Car.findByIdAndDelete(id);
};

const getCarFromDB = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(Car.find(), query)
    .search(searchText)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await carQuery.modelQuery;
  const meta = await carQuery.countTotal();
  return {
    data: result,
    meta,
  };
};

const getSingleCarFromDB = async (id: string) => {
  const car = await Car.isCarExists(id);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car not found!');
  }
  const result = await Car.findById(id);
  return result;
};

export const CarServices = {
  createCarIntoDB,
  updateSingleCar,
  deleteSingleCarFromDB,
  getCarFromDB,
  getSingleCarFromDB,
};
