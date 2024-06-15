"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const formetZodError_1 = __importDefault(require("../error/formetZodError"));
const config_1 = __importDefault(require("../config"));
const formateValidationError_1 = __importDefault(require("../error/formateValidationError"));
const formateCastError_1 = __importDefault(require("../error/formateCastError"));
const formateDublicateError_1 = __importDefault(require("../error/formateDublicateError"));
const AppError_1 = __importDefault(require("../error/AppError"));
const globalErrorHandelar = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Someting went wrong";
    let errorSources = [
        {
            path: "",
            message: "sometiog went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const sinplifiedError = (0, formetZodError_1.default)(err);
        statusCode = sinplifiedError === null || sinplifiedError === void 0 ? void 0 : sinplifiedError.statusCode;
        message = sinplifiedError === null || sinplifiedError === void 0 ? void 0 : sinplifiedError.message;
        errorSources = sinplifiedError === null || sinplifiedError === void 0 ? void 0 : sinplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const sinplifiedError = (0, formateValidationError_1.default)(err);
        statusCode = sinplifiedError === null || sinplifiedError === void 0 ? void 0 : sinplifiedError.statusCode;
        message = sinplifiedError === null || sinplifiedError === void 0 ? void 0 : sinplifiedError.message;
        errorSources = sinplifiedError === null || sinplifiedError === void 0 ? void 0 : sinplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const sinplifiedError = (0, formateCastError_1.default)(err);
        statusCode = sinplifiedError === null || sinplifiedError === void 0 ? void 0 : sinplifiedError.statusCode;
        message = sinplifiedError === null || sinplifiedError === void 0 ? void 0 : sinplifiedError.message;
        errorSources = sinplifiedError === null || sinplifiedError === void 0 ? void 0 : sinplifiedError.errorSources;
    }
    else if (err.code === 11000) {
        const sinplifiedError = (0, formateDublicateError_1.default)(err);
        statusCode = sinplifiedError === null || sinplifiedError === void 0 ? void 0 : sinplifiedError.statusCode;
        message = sinplifiedError === null || sinplifiedError === void 0 ? void 0 : sinplifiedError.message;
        errorSources = sinplifiedError === null || sinplifiedError === void 0 ? void 0 : sinplifiedError.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.NODE_ENV === "developement" ? err.stack : null,
    });
};
exports.default = globalErrorHandelar;
