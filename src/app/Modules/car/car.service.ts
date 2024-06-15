import mongoose from "mongoose";
import { TCar } from "./car.interface";
import { CarMode } from "./car.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

const createCarIntoDB = async (payloade: TCar) => {
  const insertCar = await CarMode.create(payloade);
  return insertCar;
};

const getAllCarsFromDB = async (query: any) => {
  console.log(query);

  const cars = CarMode.find();
  return cars;
};

const getSingleCarByIdFromDB = async (id: string) => {
  const getSingleCar = await CarMode.findById(id);
  return getSingleCar;
};

const deletCarByIdFromDB = async (id: string) => {
  const deleltCar = await CarMode.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return deleltCar;
};

const updateCarIntoDB = async (id: string, payloade: Partial<TCar>) => {
  const { features, ...remainCar } = payloade;
  const session = await mongoose.startSession();

  console.log(remainCar);

  try {
    session.startTransaction();

    /* ============== UPDATE BASIC INFORMATION================= */
    const updateBasicInfo = await CarMode.findByIdAndUpdate(id, remainCar, {
      new: true,
      runValidators: true,
      session,
    });
    if (!updateBasicInfo) {
      throw new AppError(
        httpStatus.EXPECTATION_FAILED,
        "Faild to update CAR, try again"
      );
    }

    /* ============== DELETE FIATURES INFORMATION================= */
    if (features && features.length > 0) {
      const deletFeatures = features
        .filter((el: any) => el.feature && el.isDeleted)
        .map((el: any) => el.feature);

      const deletFeaturesFromDB = await CarMode.findByIdAndUpdate(
        id,
        {
          $pull: { features: { $in: deletFeatures } },
        },
        { session }
      );

      if (!deletFeaturesFromDB) {
        throw new AppError(
          httpStatus.EXPECTATION_FAILED,
          "Faild to update CAR, try again"
        );
      }

      /* ============== UPDATE FIATURES INFORMATION================= */

      const updateFeatures = features
        .filter((el: any) => el.feature && !el.isDeleted)
        .map((el: any) => el.feature);

      const updateFeaturesFromDB = await CarMode.findByIdAndUpdate(
        id,
        {
          $addToSet: { features: { $each: updateFeatures } },
        },
        { session }
      );

      if (!updateFeaturesFromDB) {
        throw new AppError(
          httpStatus.EXPECTATION_FAILED,
          "Faild to update CAR, try again"
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const updatedCar = await CarMode.findById(id);
    return updatedCar;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(
      httpStatus.EXPECTATION_FAILED,
      "Faild to update CAR, try again"
    );
  }
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarByIdFromDB,
  deletCarByIdFromDB,
  updateCarIntoDB,
};
