import * as urlService from '../services/url.service.js';
import ApiError from '../utils/api-error.js';
import apiResponse from '../utils/api-response.js';

export const createUrl = async (req, res) => {
  const { originalUrl } = req.body;

  console.log('req.user:', req.user); // Log the user object to see its structure

  const urlData = {
    originalUrl,
    createdBy: req.user.id,
  };

  const newUrl = await urlService.createUrl(urlData);

  console.log('baseurl', `http://localhost:8000/api/v1/url/${newUrl.shortUrl}`); // Log the base URL for debugging

  return res
    .status(201)
    .json(apiResponse({ statusCode: 201, data: newUrl, message: 'URL created successfully' }));
};

export const getUrlByShortUrl = async (req, res) => {
  const { shortUrl } = req.params;

  if (!shortUrl) {
    throw new ApiError(400, 'Short URL is required');
  }

  const url = await urlService.findUrlByShortUrl(shortUrl);

  return res.redirect(302, url.originalUrl);
};

export const getUrlsByUser = async (req, res) => {
  const userId = req.user.id;

  const urls = await urlService.getUrlsByUser(userId);

  return res
    .status(200)
    .json(apiResponse({ data: urls, message: 'URLs fetched successfully for the user' }));
};
