import HttpException from '#exceptions/httpException';
import { NextFunction, Request, Response } from 'express';

const requesterMap = new Map<string, number>();

const rateLimittingMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const requesterId = `${req.ip}-${req.path}-${req.method}`;
  const requestedTimestamp = Date.now();

  if (requesterMap.has(requesterId)) {
    const lastRequestTimestamp = requesterMap.get(requesterId);
    if (requestedTimestamp - lastRequestTimestamp! < 1000 * 30) {
      throw new HttpException(429, 'Rate limit exceeded');
    }
  }

  requesterMap.set(requesterId, requestedTimestamp);

  next();
};

export default rateLimittingMiddleware;
