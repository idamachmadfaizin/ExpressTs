import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CookiesHelper } from '../../helpers/cookies.helper';
import USER from '../../models/database/user.database';
import { BaseResponse } from '../../models/response/base-response.model';
import { BadRequest } from '../middleware/error/bad-request';
import { Unauthorized } from '../middleware/error/unauthorized';
import { AuthService } from '../services/auth.service';

export class AuthController {
  /**
   * Login
   * @param req
   * @param res
   * @param next
   */
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const ipAddress = req.ip;
      const { email, password, isRemember } = req.body;
      if (!email && !password)
        throw new BadRequest('Email and password is required!');

      const authData = await AuthService.authenticateAsync(
        email,
        password,
        ipAddress,
      );
      if (!authData) throw new Unauthorized('Email or password is invalid!');

      CookiesHelper.setRefreshToken(res, authData.refreshToken);

      return res.json(
        new BaseResponse({ token: authData.token }, 'Login Success'),
      );
    } catch (err) {
      next(err);
    }
  }

  /**
   * Refresh token
   * @param req
   * @param res
   * @param next
   */
  public static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = CookiesHelper.getRefreshToken(req);
      const ipAddress = req.ip;
      if (!refreshToken) throw new BadRequest('Refresh Token Required');

      const authData = await AuthService.refreshTokenAsync(
        refreshToken,
        ipAddress,
      );
      if (!authData) throw new Unauthorized('Unauthorize');

      CookiesHelper.setRefreshToken(res, authData.refreshToken);

      return res.json({ token: authData.token });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Register
   * @param req
   * @param res
   * @param next
   */
  public static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      /** Check email exist */
      const userExist = await AuthService.checkEmailExist(req.body.email);
      if (userExist) throw new Unauthorized('Email already exists!');

      const user = new USER(req.body);
      const savedUser = await user.save();
      res.status(StatusCodes.OK).json({ user: savedUser._id });
    } catch (err) {
      next(err);
    }
  }
}
