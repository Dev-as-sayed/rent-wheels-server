import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/errors";
import handelZodError from "../error/formetZodError";
import config from "../config";
import handelValidationError from "../error/formateValidationError";
import castErrorHandelar from "../error/formateCastError";
import handelDuplicateError from "../error/formateDublicateError";
import AppError from "../error/AppError";

const globalErrorHandelar: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Someting went wrong";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "sometiog went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const sinplifiedError = handelZodError(err);
    statusCode = sinplifiedError?.statusCode;
    message = sinplifiedError?.message;
    errorSources = sinplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const sinplifiedError = handelValidationError(err);
    statusCode = sinplifiedError?.statusCode;
    message = sinplifiedError?.message;
    errorSources = sinplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const sinplifiedError = castErrorHandelar(err);
    statusCode = sinplifiedError?.statusCode;
    message = sinplifiedError?.message;
    errorSources = sinplifiedError?.errorSources;
  } else if (err.code === 11000) {
    const sinplifiedError = handelDuplicateError(err);
    statusCode = sinplifiedError?.statusCode;
    message = sinplifiedError?.message;
    errorSources = sinplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "developement" ? err.stack : null,
  });
};

export default globalErrorHandelar;
