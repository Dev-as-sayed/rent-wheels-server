import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/responseSendar";
import { UserServices } from "./user.service";
import { UserModel } from "./user.model";

const signup = catchAsync(async (req, res) => {
  const newUserData = req.body;

  const result = await UserServices.createUserIntoDB(newUserData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const logIn = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.logInUserOnDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
export const UserController = {
  signup,
  logIn,
};
