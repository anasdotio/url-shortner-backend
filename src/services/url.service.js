import * as urlDao from '../dao/url.dao.js';
import ApiError from '../utils/api-error.js';
import generateShortCode from '../utils/generate-short-code.js';

export const createUrl = async (urlData) => {
  urlData.shortUrl = generateShortCode();

  const newUrl = await urlDao.createUrl(urlData);

  if (!newUrl) {
    throw new Error('Failed to create URL');
  }

  return newUrl;
};

export const findUrlByShortUrl = async (shortUrl) => {
  const url = await urlDao.findUrlByShortUrl(shortUrl);

  if (!url) {
    throw new ApiError(404, 'URL not found');
  }

  await urlDao.incrementAccessCount(url._id);

  return url;
};
