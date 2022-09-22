import crypto from 'node:crypto';

export function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000 + 1);
}

export function getRandomString(): string {
  return crypto.randomBytes(20).toString('hex');
}
