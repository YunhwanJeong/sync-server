import Logger from '#config/logger';
import { Env } from '#start/env';
import type { ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';

const dbConfig = {
  appName: Env.DB_APP_NAME,
  name: Env.DB_NAME,
  host: Env.DB_HOST,
  user: Env.DB_USER,
  password: Env.DB_USER_PWD,
  minPoolSize: parseInt(Env.DB_MIN_POOL_SIZE),
  maxPoolSize: parseInt(Env.DB_MAX_POOL_SIZE),
  autoIndex: true,
  connectTimeoutMS: 60000,
  socketTimeoutMS: 45000,
};

const dbURI = `mongodb+srv://${dbConfig.user}:${encodeURIComponent(dbConfig.password)}@${
  dbConfig.host
}/${dbConfig.name}?retryWrites=true&w=majority&appName=${dbConfig.appName}`;

const connectOptions: ConnectOptions = {
  autoIndex: dbConfig.autoIndex,
  minPoolSize: dbConfig.minPoolSize,
  maxPoolSize: dbConfig.maxPoolSize,
  connectTimeoutMS: dbConfig.connectTimeoutMS,
  socketTimeoutMS: dbConfig.socketTimeoutMS,
};

Logger.debug(dbURI);

function setRunValidators(this: any) {
  this.setOptions({ runValidators: true });
}

mongoose.set('strictQuery', true);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  Logger.debug('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  Logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close().finally(() => {
    Logger.info(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});

const connectDB = () => {
  mongoose
    .plugin((schema: any) => {
      schema.pre('findOneAndUpdate', setRunValidators);
      schema.pre('updateMany', setRunValidators);
      schema.pre('updateOne', setRunValidators);
      schema.pre('update', setRunValidators);
    })
    .connect(dbURI, connectOptions)
    .then(() => {
      Logger.info('Mongoose connection done');
    })
    .catch((e) => {
      Logger.info('Mongoose connection error');
      Logger.error(e);
    });
};

export default connectDB;
