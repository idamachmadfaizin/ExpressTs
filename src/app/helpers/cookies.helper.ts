import { StringHelper } from './string.helper';
import { IRefreshToken } from './../models/database/refresh-token.database';
import { CookieOptions, Request, Response } from 'express';
import { environment } from '../../config/environment';
import { date } from 'joi';

export class CookiesHelper {
  /**
   *
   * @param res Response
   * @param refreshToken IRefreshToken
   */
  public static setRefreshToken(
    res: Response,
    refreshToken: IRefreshToken | null,
    cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: false,
    },
  ) {
    if (refreshToken) {
      cookieOptions.domain = StringHelper.domain(environment.APP_URL);
      cookieOptions.expires = new Date(refreshToken.expires);

      res.cookie('refreshToken', refreshToken.token, cookieOptions);
    }
  }

  /**
   * Get Refresh Token from cookies
   * @param req Request
   * @param cookieOrBody if True: find from cookies, is null then find in body
   */
  public static getRefreshToken(req: Request, cookieOrBody = true) {
    if (cookieOrBody)
      return req.cookies?.refreshToken || req.body?.refreshToken || null;

    return req.body?.refreshToken || req.cookies?.refreshToken || null;
  }
}
