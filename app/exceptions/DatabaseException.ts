import HttpException from './httpException.js';

class DatabaseException extends HttpException {
  constructor(message: string) {
    super(500, `Database Error: ${message}`);
  }
}

export default DatabaseException;
