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
exports.carController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const responseSendar_1 = __importDefault(require("../../utils/responseSendar"));
const car_service_1 = require("./car.service");
const createCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCar = req.body;
    const result = yield car_service_1.CarServices.createCarIntoDB(newCar);
    (0, responseSendar_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "CAR CREATED SUCCESSFULLY...",
        data: result,
    });
}));
const getAllCars = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield car_service_1.CarServices.getAllCarsFromDB(query);
    (0, responseSendar_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cars retrieved successfully",
        data: result,
    });
}));
const getSingleCarById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carId = req.params.id;
    const result = yield car_service_1.CarServices.getSingleCarByIdFromDB(carId);
    (0, responseSendar_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "A Car retrieved successfully",
        data: result,
    });
}));
const deletCarById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield car_service_1.CarServices.deletCarByIdFromDB(id);
    (0, responseSendar_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Car Deleted successfully",
        data: result,
    });
}));
const updateCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedInfo = req.body;
    const result = yield car_service_1.CarServices.updateCarIntoDB(id, updatedInfo);
    (0, responseSendar_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Car Updet successfully",
        data: result,
    });
}));
exports.carController = {
    createCar,
    getAllCars,
    getSingleCarById,
    deletCarById,
    updateCar,
};
