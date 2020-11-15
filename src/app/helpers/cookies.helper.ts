import { CookieOptions, Request, Response } from 'express';
import { environment } from '../../config/environment';

export function setRefreshTokenCookie(res: Response, refreshToken: any) {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    expires: refreshToken.expires,
  };

  res.cookie('refreshToken', refreshToken.token, cookieOptions);
}

export function getRefreshTokenCookie(req: Request, cookieOrBody = true) {
  if (cookieOrBody)
    return req.cookies?.refreshToken || req.body?.refreshToken || null;

  return req.body?.refreshToken || req.cookies?.refreshToken || null;
}
