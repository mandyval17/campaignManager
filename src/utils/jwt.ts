import { CookieOptions } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../env';
import { TUserJwtPayload } from '../api/auth/user-jwt-payload.model';

export const cookie = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  Options: {
    AUTH_TOKEN: {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, // 10 minutes
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
    } satisfies CookieOptions,
    REFRESH_TOKEN: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
    } satisfies CookieOptions,
  },
};

// Overload for doctor and user payloads

export function generateTokens(payload: TUserJwtPayload) {
  // For user, skip schema validation (or add a user schema if needed)
  const authToken = jwt.sign(payload, env.JWT_AUTH_SECRET, { expiresIn: parseInt(env.JWT_AUTH_EXPIRY, 10) });
  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: parseInt(env.JWT_REFRESH_EXPIRY, 10) });
  return { authToken, refreshToken };
}

type TValidateToken = {
  status: 'VALID',
  payload: TUserJwtPayload,
} | {
  status: 'EXPIRED',
  payload: null,
} | {
  status: 'INVALID',
  payload: null,
};

function validateToken(token: string, secret: string): TValidateToken {
  try {
    const decodedPayload = jwt.verify(token, secret);
    console.log(decodedPayload, 'hello');
    return {
      status: 'VALID',
      payload: decodedPayload as TUserJwtPayload,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.TokenExpiredError) {
      return {
        status: 'EXPIRED',
        payload: null,
      };
    }
    return {
      status: 'INVALID',
      payload: null,
    };
  }
}

export function validateAuthToken(token: string) {
  return validateToken(token, env.JWT_AUTH_SECRET);
}

export function validateRefreshToken(token: string) {
  return validateToken(token, env.JWT_REFRESH_SECRET);
}