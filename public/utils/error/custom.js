class CustomAPIError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message, 400);
    }
}
class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message, 401);
    }
}
class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message, 404);
    }
}
export { BadRequestError, UnauthenticatedError, NotFoundError };
