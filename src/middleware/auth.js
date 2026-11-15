import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import ApiError from '../utils/api-error.js';

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication token is required'));
  }

  const token = header.slice(7).trim();
  if (!token) {
    return next(new ApiError(401, 'Authentication token is required'));
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    if (typeof payload !== 'object' || typeof payload.sub !== 'string') {
      return next(new ApiError(401, 'Invalid authentication token'));
    }
    req.user = { id: payload.sub };
    return next();
  } catch (error) {
    return next(new ApiError(401, 'Invalid or expired authentication token'));
  }
};

export default authenticate;
