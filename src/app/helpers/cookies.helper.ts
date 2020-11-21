/**
 * Cookies Helper
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:39:44
 */

import { CookieOptions, Request, Response } from 'express';
import { environment } from '../../config/environment';
import { IRefreshToken } from './../models/database/refresh-token.database';
import { StringHelper } from './string.helper';

export class CookiesHelper {
  /**
   * Set Refresh token
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
   * Get Refresh Token
   * @param req Request
   * @param cookieOrBody if True: find from cookies, is null then find in body
   */
  public static getRefreshToken(req: Request, cookieOrBody = true) {
    if (cookieOrBody)
      return req.cookies?.refreshToken || req.body?.refreshToken || null;

    return req.body?.refreshToken || req.cookies?.refreshToken || null;
  }
}
