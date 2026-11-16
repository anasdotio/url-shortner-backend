import { randomBytes } from 'node:crypto';

function generateShortCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  while (result.length < length) {
    const bytes = randomBytes(length);

    for (const byte of bytes) {
      if (byte < 248) {
        result += chars[byte % 62];
        if (result.length === length) break;
      }
    }
  }

  return result;
}

export default generateShortCode;
