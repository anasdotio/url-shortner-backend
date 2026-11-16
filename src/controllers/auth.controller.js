import * as authService from '../services/auth.service.js';
import ApiError from '../utils/api-error.js';
import apiResponse from '../utils/api-response.js';

const required = (value, field) => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new ApiError(400, `${field} is required`);
  }
  return value.trim();
};

export const register = async (req, res) => {
  const username = required(req.body.username, 'Username');
  const email = required(req.body.email, 'Email').toLowerCase();
  const password = required(req.body.password, 'Password');
  const result = await authService.createUser({ username, email, password });

  return res
    .status(201)
    .json(apiResponse({ statusCode: 201, data: result, message: 'User registered successfully' }));
};

export const login = async (req, res) => {
  const identifier = required(
    req.body.identifier || req.body.email || req.body.username,
    'Username or email'
  );
  const password = required(req.body.password, 'Password');
  const result = await authService.loginUser(identifier, password);

  return res.status(200).json(apiResponse({ data: result, message: 'Login successful' }));
};

export const currentUser = async (req, res) => {
  const user = await authService.getUserById(req.user.id);
  return res
    .status(200)
    .json(apiResponse({ data: { user }, message: 'Current user fetched successfully' }));
};
