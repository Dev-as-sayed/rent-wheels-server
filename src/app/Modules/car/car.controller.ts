import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/responseSendar";
import { CarServices } from "./car.service";
import { any } from "zod";

const createCar = catchAsync(async (req, res) => {
  const newCar = req.body;
  const result = await CarServices.createCarIntoDB(newCar);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CAR CREATED SUCCESSFULLY...",
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CarServices.getAllCarsFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars retrieved successfully",
    data: result,
  });
});

const getSingleCarById = catchAsync(async (req, res) => {
  const carId = req.params.id;
  const result = await CarServices.getSingleCarByIdFromDB(carId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A Car retrieved successfully",
    data: result,
  });
});

const deletCarById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CarServices.deletCarByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car Deleted successfully",
    data: result,
  });
});

const updateCar = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedInfo = req.body;

  const result = await CarServices.updateCarIntoDB(id, updatedInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car Updet successfully",
    data: result,
  });
});
export const carController = {
  createCar,
  getAllCars,
  getSingleCarById,
  deletCarById,
  updateCar,
};
