import redisClient from '../config/redis.js';
import * as urlDao from '../dao/url.dao.js';
import ApiError from '../utils/api-error.js';
import generateShortCode from '../utils/generate-short-code.js';

export const createUrl = async (urlData) => {
  urlData.shortUrl = generateShortCode();

  const newUrl = await urlDao.createUrl(urlData);

  if (!newUrl) {
    throw new Error('Failed to create URL');
  }

  await redisClient.set(`url:${newUrl.shortUrl}`, JSON.stringify(newUrl));

  return newUrl;
};

export const findUrlByShortUrl = async (shortUrl) => {
  const cachedUrl = await redisClient.get(`url:${shortUrl}`);

  if (cachedUrl) {
    await urlDao.incrementAccessCount(JSON.parse(cachedUrl)._id); // Increment access count in the database
    return JSON.parse(cachedUrl);
  }

  const url = await urlDao.findUrlByShortUrl(shortUrl);

  if (!url) {
    throw new ApiError(404, 'URL not found');
  }

  await urlDao.incrementAccessCount(url._id);

  await redisClient.set(`url:${url.shortUrl}`, JSON.stringify(url));

  return url;
};

export const getUrlsByUser = async (userId) => {

  const urls = await urlDao.findUrlsByUser(userId);

  if (!urls) {
    throw new ApiError(404, 'No URLs found for this user');
  }

  return urls;

};

