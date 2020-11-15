import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from '../services/auth-service';
import { environment } from './../../../config/environment';
import USER from './../../models/database/user';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Unauthorized } from '../middleware/error/unauthorized';

export class AuthController {
  /**
   * Login
   * @param req
   * @param res
   * @param next
   */
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      /** Check email exist */
      const userExist = await AuthService.checkEmailExist(req.body.email) as any;
      if (!userExist)
        throw new Unauthorized('Email not found');

      /** Check password */
      const passwordValid = bcrypt.compareSync(req.body.password, userExist.password);
      if (!passwordValid)
        throw new Unauthorized('Invalid password');

      /** Create JWT */
      const token = jwt.sign({ user: userExist._id }, environment.TOKEN_SECRET);
      res.status(StatusCodes.OK).json(token);
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
  public static async register(req: Request, res: Response, next: NextFunction) {
    try {
      /** Check email exist */
      const userExist = await AuthService.checkEmailExist(req.body.email) as any;
      if (userExist)
        throw new Unauthorized('Email already exists!');

      const user = new USER(req.body);
      const savedUser = await user.save();
      res.status(StatusCodes.OK).json({ user: savedUser._id });
    } catch (err) {
      next(err);
    }
  }
}
