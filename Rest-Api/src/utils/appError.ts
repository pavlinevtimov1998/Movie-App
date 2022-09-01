export class AppError extends Error {
  isOperational: boolean;
  status: string;

  constructor(public message: string, public statusCode: number) {
    super(message);

    this.status = `${this.statusCode}`.startsWith("4") ? "Fail" : "Error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
