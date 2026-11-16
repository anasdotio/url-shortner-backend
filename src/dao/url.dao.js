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

export const findUrlsByUser = async (userId) => {
  return Url.find({ createdBy: userId }).sort({ createdAt: -1 });
};

export const findUrlById = async (urlId) => {
  return Url.findById(urlId);
};

export const updateUrl = async (urlId, updateData) => {
  return Url.findByIdAndUpdate(urlId, updateData, { new: true });
};

export const deleteUrl = async (urlId) => {
  return Url.findByIdAndDelete(urlId);
};
