import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TCar } from "../car/car.interface";
import { CarMode } from "../car/car.model";
import { TBooking, TBookingReturn } from "./booking.interface";
import { BookingModel } from "./booking.model";

const bookingCarInroDB = async (paylode: TBooking) => {
  const carId = paylode.car;
  const carData = await CarMode.findById(carId);

  if ((carData as TCar).status === "unavailable") {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This Car is not availabele right naw"
    );
  }
  const carStatusUpdate = await CarMode.findByIdAndUpdate(carId, {
    status: "unavailable",
  });

  const insertData = await BookingModel.create(paylode);
  return insertData;
};

const getAllBookingsFromDB = async () => {
  const getBookigs = await BookingModel.find().populate("car").populate("user");
  return getBookigs;
};

const getMyBookingsFromDB = async (id: string) => {
  const getMyBookingsData = await BookingModel.findOne({ user: id }).populate(
    "car"
  );
  return getMyBookingsData;
};

const carReturnOnDB = async (payloade: TBookingReturn) => {
  const bookingId = payloade?.bookingId;

  const booking = await BookingModel.findById(bookingId);
  const car = await CarMode.findById(booking?.car);
  console.log(car, "booking", { booking });

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  const carId = booking?.car;
  const carStatusUpdate = await CarMode.findByIdAndUpdate(carId, {
    status: "unavailable",
  });

  const startTime = booking?.startTime;
  const endTime = payloade?.endTime;
  const priceInPerHoure = car?.pricePerHour;

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTimeInMinutes = startHour * 60 + startMinute;
  const endTimeInMinutes = endHour * 60 + endMinute;
  const durationInHours = (endTimeInMinutes - startTimeInMinutes) / 60;

  const totalPrice = durationInHours * (priceInPerHoure as number);

  const updateBookingForReturn = await BookingModel.findByIdAndUpdate(
    bookingId,
    { endTime: payloade?.endTime, totalCost: totalPrice },
    { new: true }
  );

  return updateBookingForReturn;
};

export const BookingServices = {
  bookingCarInroDB,
  getAllBookingsFromDB,
  getMyBookingsFromDB,
  carReturnOnDB,
};
