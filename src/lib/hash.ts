import * as crypto from 'crypto';

export function hashMD5(value: string) {
  const combinedString = value + 'secret';
  const hash = crypto.createHash('md5').update(combinedString).digest('hex');
  return hash;
}
