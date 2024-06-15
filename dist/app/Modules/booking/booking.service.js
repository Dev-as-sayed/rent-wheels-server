"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const car_model_1 = require("../car/car.model");
const booking_model_1 = require("./booking.model");
const bookingCarInroDB = (paylode) => __awaiter(void 0, void 0, void 0, function* () {
    const carId = paylode.car;
    const carData = yield car_model_1.CarMode.findById(carId);
    if (carData.status === "unavailable") {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This Car is not availabele right naw");
    }
    const carStatusUpdate = yield car_model_1.CarMode.findByIdAndUpdate(carId, {
        status: "unavailable",
    });
    const insertData = yield booking_model_1.BookingModel.create(paylode);
    return insertData;
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const getBookigs = yield booking_model_1.BookingModel.find().populate("car").populate("user");
    return getBookigs;
});
const getMyBookingsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getMyBookingsData = yield booking_model_1.BookingModel.findOne({ user: id }).populate("car");
    return getMyBookingsData;
});
const carReturnOnDB = (payloade) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = payloade === null || payloade === void 0 ? void 0 : payloade.bookingId;
    const booking = yield booking_model_1.BookingModel.findById(bookingId);
    const car = yield car_model_1.CarMode.findById(booking === null || booking === void 0 ? void 0 : booking.car);
    console.log(car, "booking", { booking });
    if (!booking) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking not found");
    }
    const carId = booking === null || booking === void 0 ? void 0 : booking.car;
    const carStatusUpdate = yield car_model_1.CarMode.findByIdAndUpdate(carId, {
        status: "unavailable",
    });
    const startTime = booking === null || booking === void 0 ? void 0 : booking.startTime;
    const endTime = payloade === null || payloade === void 0 ? void 0 : payloade.endTime;
    const priceInPerHoure = car === null || car === void 0 ? void 0 : car.pricePerHour;
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    const durationInHours = (endTimeInMinutes - startTimeInMinutes) / 60;
    const totalPrice = durationInHours * priceInPerHoure;
    const updateBookingForReturn = yield booking_model_1.BookingModel.findByIdAndUpdate(bookingId, { endTime: payloade === null || payloade === void 0 ? void 0 : payloade.endTime, totalCost: totalPrice }, { new: true });
    return updateBookingForReturn;
});
exports.BookingServices = {
    bookingCarInroDB,
    getAllBookingsFromDB,
    getMyBookingsFromDB,
    carReturnOnDB,
};
