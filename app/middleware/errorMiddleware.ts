import HttpException from '#exceptions/httpException';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  error: HttpException | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = error instanceof HttpException ? error.status : 500;
  const message =
    error instanceof HttpException ? error.message : 'Something went wrong';
  res.status(status).send({ status, message });
};

export default errorMiddleware;
