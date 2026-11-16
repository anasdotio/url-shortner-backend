import { Url } from '../models/url.model.js';

export const createUrl = async (urlData) => {
  return Url.create(urlData);
};

export const findUrlByShortUrl = async (shortUrl) => {
  return Url.findOne({ shortUrl });
};

export const incrementAccessCount = async (urlId) => {
  return Url.findByIdAndUpdate(urlId, { $inc: { accessCount: 1 } }, { new: true });
};
