import connectDB from '#config/database';
import Logger from '#config/logger';
import corsMiddleware from '#middleware/corsMiddleware';
import errorMiddleware from '#middleware/errorMiddleware';
import routes from '#start/routes';
import express from 'express';

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

connectDB();

app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);
app.use(corsMiddleware);
app.use(routes);
app.use(errorMiddleware);

export default app;
