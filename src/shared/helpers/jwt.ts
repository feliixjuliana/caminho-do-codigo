import jwt from 'jsonwebtoken';
import { config } from '../../config/environment';

export function generateToken(payload: object): string {
  return jwt.sign(payload, config.jwt_secret);
}

export function verifyToken(token: string): any {
  return jwt.verify(token, config.jwt_secret);
}