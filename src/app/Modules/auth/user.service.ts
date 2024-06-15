import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TLoginUser, TUser } from "./user.ifterface";
import { UserModel } from "./user.model";
import bcrypt from "bcrypt";
import { createToken } from "./user.utils";
import config from "../../config";

const createUserIntoDB = async (patloade: TUser) => {
  const email = patloade.email;

  const emailExist = await UserModel.findOne({ email: email });

  console.log(emailExist);

  if (emailExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email already used");
  }

  const insertUser = await UserModel.create(patloade);
  return insertUser;
};

const logInUserOnDB = async (payloade: TLoginUser) => {
  const { email, password } = payloade;

  let user = await UserModel.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const matchPassword = await bcrypt.compare(password, user?.password);
  if (!matchPassword) {
    throw new AppError(httpStatus.FORBIDDEN, "Password daos not match");
  }

  user.password = "";

  const jwtPayloade = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayloade,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayloade,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const UserServices = {
  createUserIntoDB,
  logInUserOnDB,
};
