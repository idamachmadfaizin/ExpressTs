import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CookiesHelper } from '../../helpers/cookies.helper';
import USER from '../../models/database/user.database';
import { ILogin } from '../../models/interfaces/login.interface';
import { IRegister } from '../../models/interfaces/register.interface';
import { BaseResponse } from '../../models/response/base-response.model';
import { BadRequest } from '../middleware/error/bad-request';
import { Unauthorized } from '../middleware/error/unauthorized';
import { AuthService } from '../services/auth.service';

export class AuthController {
  /**
   * Login
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const ipAddress = req.ip;
      const loginReq: ILogin = req.body;
      if (!loginReq.email && !loginReq.password)
        throw new BadRequest('Email and password is required!');

      const authData = await AuthService.authenticateAsync(loginReq, ipAddress);
      if (!authData) throw new Unauthorized('Email or password is invalid!');

      if (loginReq.isRemember)
        CookiesHelper.setRefreshToken(res, authData.refreshToken);

      return res.json(
        new BaseResponse({ token: authData.token }, 'Login success'),
      );
    } catch (err) {
      next(err);
    }
  }

  /**
   * Refresh token
   * @param req Request
   * @param res Response
   * @param next NextFunction
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

      return res
        .status(StatusCodes.OK)
        .json(
          new BaseResponse({ token: authData.token }, 'Refresh token success'),
        );
    } catch (err) {
      next(err);
    }
  }

  /**
   * Register
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  public static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const registerReq: IRegister = req.body;

      /** Check email exist */
      const userExist = await AuthService.checkEmailExistAsync(
        registerReq.email,
      );
      if (userExist) throw new Unauthorized('Email already exists!');

      const user = new USER(registerReq);
      const savedUser = await user.save();

      res
        .status(StatusCodes.OK)
        .json(new BaseResponse({ user: savedUser._id }, 'Register success'));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Revoke Refresh Token
   * @param req Request
   * @param res Response
   * @param next NextFunction
   */
  public static async revoke(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = CookiesHelper.getRefreshToken(req, false);
      const ipAddress = req.ip;
      if (!refreshToken) throw new BadRequest('Refresh Token is required');

      const revoked = await AuthService.revokeTokenAsync(
        refreshToken,
        ipAddress,
      );
      if (revoked == null) throw new BadRequest('Refresh Token is required');

      return res
        .status(StatusCodes.OK)
        .json(
          new BaseResponse(
            null,
            revoked ? 'Revoke Success' : 'Already revoked',
          ),
        );
    } catch (err) {
      next(err);
    }
  }
}
