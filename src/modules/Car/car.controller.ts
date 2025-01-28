import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { CarServices } from './car.service';
import sendResponse from '../../app/utils/sendResponse';

const createCar: RequestHandler = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'Car created successfully',
    statusCode: 201,
    data: result,
  });
});

const deleteSingleCar: RequestHandler = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const result = await CarServices.deleteSingleCarFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Car deleted successfully',
    statusCode: 200,
    data: result,
  });
});

const updateCar: RequestHandler = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const result = await CarServices.updateSingleCar(req.body, id);
  console.log("Car update",result);
  sendResponse(res, {
    success: true,
    message: 'Car updated successfully',
    statusCode: 200,
    data: result,
  });
});

const getCar: RequestHandler = catchAsync(async (req, res) => {
  const result = await CarServices.getCarFromDB(req?.query);
  // console.log('Query Parameters:', req.query); 
  sendResponse(res, {
    success: true,
    message: 'Car fetched successfully',
    statusCode: 200,
    data: result,
  });
});

const getSingleCar: RequestHandler = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const result = await CarServices.getSingleCarFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Car fetched successfully',
    statusCode: 200,
    data: result,
  });
});

export const CarControllers = {
  createCar,
  updateCar,
  deleteSingleCar,
  getCar,
  getSingleCar,
};
