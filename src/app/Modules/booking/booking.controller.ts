import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/responseSendar";
import { BookingServices } from "./booking.service";

const bookingACar = catchAsync(async (req, res) => {
  const bookingData = req.body;

  const result = await BookingServices.bookingCarInroDB(bookingData);
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars retrieved successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res) => {
  const { myBookings } = req.params;
  const result = await BookingServices.getMyBookingsFromDB(myBookings);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your bookings retrieved successfully",
    data: result,
  });
});

const carReturn = catchAsync(async (req, res) => {
  const returnInfo = req.body;

  const result = await BookingServices.carReturnOnDB(returnInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car return successfully",
    data: result,
  });
});

export const BookingController = {
  bookingACar,
  getAllBookings,
  getMyBookings,
  carReturn,
};
