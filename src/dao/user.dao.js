import { User } from '../models/user.model.js';

export const createUser = async (userData) => {
  return User.create(userData);
};

export const findUserById = async (userId) => {
  return User.findById(userId);
};

export const findUserByUsernameOrEmail = async (username, email) => {
  return User.findOne({ $or: [{ username }, { email }] });
};

export const findUserByLogin = async (identifier) => {
  return User.findOne({
    $or: [{ username: identifier }, { email: identifier.toLowerCase() }],
  }).select('+password');
};
