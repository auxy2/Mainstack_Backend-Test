import { Response } from "express";

/**
 *
 */
const error = (res: Response, code: number, err: string | Error): Response => {
  let message = typeof err === "string" ? err :  err.message
  let customCode = code;

  if (message === 'jwt expired') {
    message = 'Please login again';
    customCode = 401;
  }

  const networkError = message.split(' ')[0];
  if (networkError === 'getaddrinfo')
    message = 'Server not connected to internet';

  const duplicateError = message.split(' ')[0];
  if (duplicateError === 'E11000')
    message = 'Record exist please review your fields';

  return res.status(customCode).json({
    success: 0,
    message: message,
  });
};

const success = (res: Response, statusCode: number, userData: unknown, data: unknown): Response => {
  return res.status(statusCode).send({
    success: 1,
    message: 'Successful',
    data,
    userData,
  });
};

// response.js

export const sendResponse = (res: Response, statusCode: number, data: unknown): Response => {
  return res.status(statusCode).json({
    success: 1,
    message: 'Successful',
    data,
  });
};

export { error, success };
