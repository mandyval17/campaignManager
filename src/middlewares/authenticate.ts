import { NextFunction, Request, Response } from 'express';
import { cookie, generateTokens, validateAuthToken, validateRefreshToken } from '../utils/jwt';
import { TUserJwtPayload } from '../api/auth/user-jwt-payload.model';

declare global {
  namespace Express {
    interface Request {
      tokenExpired?: boolean;
      user?: TUserJwtPayload;
    }
  }
}



export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authToken = req.cookies[cookie.AUTH_TOKEN];

  if (!authToken) {
    res.clearCookie(cookie.REFRESH_TOKEN);
    return res.status(401).json({ error: 'Auth token not found' });
  }

  const { status, payload } = validateAuthToken(authToken);
  console.log(status, payload);

  if (status === 'EXPIRED') {
    req.tokenExpired = true;
    return next();
  }

  if (status === 'INVALID') {
    // res.clearCookie(cookie.AUTH_TOKEN);
    // res.clearCookie(cookie.REFRESH_TOKEN);
    return res.status(401).json({ error: 'Invalid auth token' });
  }

  req.tokenExpired = false;
  req.user = payload;
  next();

}


// Middleware to refresh expired token
export const refreshTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.tokenExpired) return next(); // Proceed if token isn't expired

  const refreshToken = req.cookies[cookie.REFRESH_TOKEN];

  if (!refreshToken) {
    res.clearCookie(cookie.AUTH_TOKEN);
    return res.status(401).json({ error: 'Refresh token not found' });
  }

  const { payload, status } = validateRefreshToken(refreshToken);

  if (status === 'INVALID' || status === 'EXPIRED') {
    res.clearCookie(cookie.AUTH_TOKEN);
    res.clearCookie(cookie.REFRESH_TOKEN);
    return res.status(401).json({ error: 'Invalid/Expired refresh token' });
  }

  const { authToken, refreshToken: _refreshToken } = generateTokens(payload);
  res.cookie(cookie.AUTH_TOKEN, authToken, cookie.Options.AUTH_TOKEN);
  // res.cookie(cookie.REFRESH_TOKEN, refreshToken, cookie.Options.REFRESH_TOKEN);

  req.tokenExpired = false;
  req.user = payload;
  next();
};
