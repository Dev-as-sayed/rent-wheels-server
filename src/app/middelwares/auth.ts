import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import { TUserRole } from "../Modules/auth/user.ifterface";
import AppError from "../error/AppError";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import { UserModel } from "../Modules/auth/user.model";
import { any } from "zod";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const authHeader: any = req.headers.authorization;

    const token = authHeader.split(" ")[1];

    console.log(token);

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { email, role, iat } = decoded;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found..!");
    }

    if (!(role === user?.role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    // req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
