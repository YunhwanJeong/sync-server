import HttpException from '#exceptions/httpException';
import axios from 'axios';

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : 500;
    const message = error.response
      ? error.response.data.message
      : 'Unknown error';
    throw new HttpException(status, message);
  },
);

export default instance;
