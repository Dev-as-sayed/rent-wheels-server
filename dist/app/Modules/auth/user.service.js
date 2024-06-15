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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_utils_1 = require("./user.utils");
const config_1 = __importDefault(require("../../config"));
const createUserIntoDB = (patloade) => __awaiter(void 0, void 0, void 0, function* () {
    const email = patloade.email;
    const emailExist = yield user_model_1.UserModel.findOne({ email: email });
    console.log(emailExist);
    if (emailExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Email already used");
    }
    const insertUser = yield user_model_1.UserModel.create(patloade);
    return insertUser;
});
const logInUserOnDB = (payloade) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payloade;
    let user = yield user_model_1.UserModel.findOne({ email: email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const matchPassword = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!matchPassword) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password daos not match");
    }
    user.password = "";
    const jwtPayloade = {
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayloade, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, user_utils_1.createToken)(jwtPayloade, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        user,
    };
});
exports.UserServices = {
    createUserIntoDB,
    logInUserOnDB,
};
