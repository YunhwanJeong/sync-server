import HttpException from '#exceptions/httpException';
import errorMiddleware from '#middleware/errorMiddleware';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { NextFunction, Request, Response, Send } from 'express';

describe('errorMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis() as (
        code: number,
      ) => Response<any, Record<string, any>>,
      send: jest.fn() as Send,
    };
    next = jest.fn();
  });

  it('should handle HttpException', () => {
    const error = new HttpException(400, 'Bad Request');

    errorMiddleware(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 400,
      message: 'Bad Request',
    });
  });

  it('should handle generic errors', () => {
    const error = new Error('Unknown Error');

    errorMiddleware(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: 500,
      message: 'Something went wrong',
    });
  });
});
