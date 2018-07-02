import crypto from 'crypto';

export default function createHash(url) {
  const hash = crypto.createHash('sha256');
  hash.update(url);

  return hash.digest('hex');
}
