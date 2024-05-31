import { Env } from '#start/env';
import cors from 'cors';

const corsMiddleware = cors({
  origin: Env.CORS_URL,
});

export default corsMiddleware;
