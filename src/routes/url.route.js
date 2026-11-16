import { Router } from 'express';
import authenticate from '../middleware/auth.js';
import * as urlController from '../controllers/url.controller.js';
import asyncHandler from '../utils/async-catch.js';

const router = Router();

router.post('/shorten', authenticate, asyncHandler(urlController.createUrl));
router.get('/:shortUrl', asyncHandler(urlController.getUrlByShortUrl));
router.get('/user/urls', authenticate, asyncHandler(urlController.getUrlsByUser));
router.put('/:id', authenticate, asyncHandler(urlController.updateUrl));

router.delete('/:id', authenticate, asyncHandler(urlController.deleteUrl));

export default router;
