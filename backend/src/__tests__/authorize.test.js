import { authorize } from '../middlewares/auth.middleware';
import { Request, Response, NextFunction } from 'express';
// const authorize = require("../middlewares/auth.middleware");

describe('authorize', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    // Set up mock request, response, and next objects
    req = {
      path: '/api/v1/auth/login/',
      headers: {},
    } as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as Response;
    next = jest.fn();
  });

  test('it allows access to the login endpoint', () => {
    // Call the middleware function
    authorize()(req, res, next);

    // Verify that the next function was called
    expect(next).toHaveBeenCalled();
  });

});



  // test('it returns a 401 error if the request does not have a token', () => {
  //   // Set the request path to a different endpoint
  //   req.path = '/api/v1/users/';

  //   // Call the middleware function
  //   authorize()(req, res, next);

  //   // Verify that the response status and json functions were called with the correct arguments
  //   expect(res.status).toHaveBeenCalledWith(401);
  //   expect(res.json).toHaveBeenCalledWith({ message: 'Token is missing' });
  // });

  // test('it returns a 401 error if the token is expired', () => {
  //   // Set the request path to a different endpoint
  //   req.path = '/api/v1/users/';
  //   // Set the request header to include a token
  //   req.headers.authorization = 'Bearer expired-token';

  //   // Set up a mock for the validateToken function to throw a TokenExpiredError
  //   jest.mock('../api/utils/jwt.utils', () => ({
  //     validateToken: jest.fn().mockImplementation(() => {
  //       throw new Error('TokenExpiredError');
  //     }),
  //   }));

  //   // Call the middleware function
  //   authorize()(req, res, next);

  //   // Verify that the response status and json functions were called with the correct arguments
  //   expect(res.status).toHaveBeenCalledWith(401);
  //   expect(res.json).toHaveBeenCalledWith({ message: 'Expired token' });
  // });

  // test('it returns a 401 error if the token is invalid', () => {
  //   // Set the request path to a different endpoint
  //   req.path = '/api/v1/users/';
  //   // Set the request header to include a token
  //   req.headers.authorization = 'Bearer invalid-token';

  //   // Set up a mock for the validateToken function to throw a JsonWebTokenError
  //   jest.mock('../api/utils/jwt.utils', () => ({
  //     validateToken: jest.fn().mockImplementation(() => {
  //       throw new Error('JsonWebTokenError');
  //     }),
  //   }));

  //   // Call the middleware function
  //   authorize
  // });