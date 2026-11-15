import * as userDao from '../dao/user.dao.js';
import ApiError from '../utils/api-error.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const createToken = (userId) =>
  jwt.sign({ sub: userId.toString() }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });

export const createUser = async (userData) => {
  const existingUser = await userDao.findUserByUsernameOrEmail(
    userData.username,
    userData.email
  );

  if (existingUser) {
    throw new ApiError(409, 'Username or email already exists');
  }

  const newUser = await userDao.createUser(userData);
  if (!newUser) {
    throw new ApiError(500, 'Failed to create user');
  }

  return { user: newUser.toJSON(), token: createToken(newUser._id) };
};

export const loginUser = async (identifier, password) => {
  const user = await userDao.findUserByLogin(identifier);
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid username/email or password');
  }

  return { user: user.toJSON(), token: createToken(user._id) };
};

export const getUserById = async (userId) => {
  const user = await userDao.findUserById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};
