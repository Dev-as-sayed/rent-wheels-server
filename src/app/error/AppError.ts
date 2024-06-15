class AppError extends Error {
  public statusCode: number;

  constructor(stausCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = stausCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
