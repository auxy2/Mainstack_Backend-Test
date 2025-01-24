class CustomAPIError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  
  class BadRequestError extends CustomAPIError {
    constructor(message: string) {
      super(message, 400);
    }
  }
  
  class UnauthenticatedError extends CustomAPIError {
    constructor(message: string) {
      super(message, 401);
    }
  }
  
  class NotFoundError extends CustomAPIError {
    constructor(message: string) {
      super(message, 404);
    }
  }
  
  export { BadRequestError, UnauthenticatedError, NotFoundError };
  