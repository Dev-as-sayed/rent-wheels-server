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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const car_model_1 = require("./car.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createCarIntoDB = (payloade) => __awaiter(void 0, void 0, void 0, function* () {
    const insertCar = yield car_model_1.CarMode.create(payloade);
    return insertCar;
});
const getAllCarsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const cars = car_model_1.CarMode.find();
    return cars;
});
const getSingleCarByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getSingleCar = yield car_model_1.CarMode.findById(id);
    return getSingleCar;
});
const deletCarByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleltCar = yield car_model_1.CarMode.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return deleltCar;
});
const updateCarIntoDB = (id, payloade) => __awaiter(void 0, void 0, void 0, function* () {
    const { features } = payloade, remainCar = __rest(payloade, ["features"]);
    const session = yield mongoose_1.default.startSession();
    console.log(remainCar);
    try {
        session.startTransaction();
        /* ============== UPDATE BASIC INFORMATION================= */
        const updateBasicInfo = yield car_model_1.CarMode.findByIdAndUpdate(id, remainCar, {
            new: true,
            runValidators: true,
            session,
        });
        if (!updateBasicInfo) {
            throw new AppError_1.default(http_status_1.default.EXPECTATION_FAILED, "Faild to update CAR, try again");
        }
        /* ============== DELETE FIATURES INFORMATION================= */
        if (features && features.length > 0) {
            const deletFeatures = features
                .filter((el) => el.feature && el.isDeleted)
                .map((el) => el.feature);
            const deletFeaturesFromDB = yield car_model_1.CarMode.findByIdAndUpdate(id, {
                $pull: { features: { $in: deletFeatures } },
            }, { session });
            if (!deletFeaturesFromDB) {
                throw new AppError_1.default(http_status_1.default.EXPECTATION_FAILED, "Faild to update CAR, try again");
            }
            /* ============== UPDATE FIATURES INFORMATION================= */
            const updateFeatures = features
                .filter((el) => el.feature && !el.isDeleted)
                .map((el) => el.feature);
            const updateFeaturesFromDB = yield car_model_1.CarMode.findByIdAndUpdate(id, {
                $addToSet: { features: { $each: updateFeatures } },
            }, { session });
            if (!updateFeaturesFromDB) {
                throw new AppError_1.default(http_status_1.default.EXPECTATION_FAILED, "Faild to update CAR, try again");
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
        const updatedCar = yield car_model_1.CarMode.findById(id);
        return updatedCar;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.EXPECTATION_FAILED, "Faild to update CAR, try again");
    }
});
exports.CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getSingleCarByIdFromDB,
    deletCarByIdFromDB,
    updateCarIntoDB,
};
