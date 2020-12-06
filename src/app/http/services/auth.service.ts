/**
 * Authentication service
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:55:04
 */

import bcrypt from 'bcrypt';
import CryptoJS, { lib } from 'crypto-js';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import ms from 'ms';
import { environment } from '../../../config/environment';
import REFRESH_TOKEN from '../../models/database/refresh-token.database';
import ROLE from '../../models/database/role.database';
import USER, { IUser } from '../../models/database/user.database';
import { IPayload } from '../../models/interfaces/payload.interface';
import {
  IAssignDenyRole,
  ILogin,
} from '../../models/interfaces/request/auth.interface';
import { BadRequest } from '../middleware/error/bad-request';
import { Unauthorized } from '../middleware/error/unauthorized';

export class AuthService {
  /**
   * Check email exist async
   * @param email string
   */
  public static async checkEmailExistAsync(email: string) {
    try {
      const emailExist = await USER.findOne({ email });
      return emailExist;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Login service async
   * @param loginReq ILogin
   * @param ipAddress string
   */
  public static async authenticateAsync(loginReq: ILogin, ipAddress: string) {
    if (!loginReq.email && !loginReq.password && !ipAddress) return null;

    const userExist = await USER.findOne({ email: loginReq.email }).populate(
      'roles',
    );
    if (!userExist) return null;

    const validPassword = bcrypt.compareSync(
      loginReq.password,
      userExist.password,
    );
    if (!validPassword) return null;

    const token = this.generateToken(userExist);
    const refreshToken = loginReq.isRemember
      ? this.generateRefreshToken(userExist, ipAddress)
      : null;

    refreshToken?.save();

    return { token, refreshToken };
  }

  /**
   * Refresh token service async
   * @param refreshToken string
   * @param ipAddress string
   */
  public static async refreshTokenAsync(
    refreshToken: string,
    ipAddress: string,
  ) {
    if (!refreshToken && !ipAddress) return null;

    const existRefresh = await REFRESH_TOKEN.findOne({
      token: refreshToken,
    }).populate('user');
    if (!existRefresh || !existRefresh.isActive)
      throw new Unauthorized('Invalid Token');

    const { user } = existRefresh;
    if (!user) throw new Unauthorized('User not found');

    const newRefreshToken = this.generateRefreshToken(user, ipAddress);
    existRefresh.revoked = Date.now();
    existRefresh.revokedByIp = ipAddress;
    existRefresh.replacedByToken = newRefreshToken.token;
    existRefresh.save();
    newRefreshToken.save();

    const token = this.generateToken(user);

    return {
      token,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * Revoke refresh token service async
   * @param refreshToken string
   * @param ipAddress string
   */
  public static async revokeTokenAsync(
    refreshToken: string,
    ipAddress: string,
  ) {
    if (!refreshToken && !ipAddress) return null;

    const existRefresh = await REFRESH_TOKEN.findOne({ token: refreshToken });
    if (!existRefresh || !existRefresh.isActive) return false;

    existRefresh.revoked = Date.now();
    existRefresh.revokedByIp = ipAddress;
    existRefresh.save();
    return true;
  }

  /**
   * Replace and assign new roles to user
   * @param assignRoles IAssignDenyRole
   */
  public static async reAssignRolesAsync(assignRoles: IAssignDenyRole) {
    if (
      !assignRoles ||
      !assignRoles?.userId ||
      assignRoles?.roles?.length === 0
    )
      throw new BadRequest();

    /** Check exist user */
    const existUser = await USER.findById(assignRoles.userId);
    if (!existUser) throw new BadRequest('User notfound');

    /** Get roles by role name */
    const roles = await ROLE.find({ name: { $in: assignRoles.roles } });
    if (!roles || roles?.length === 0) throw new BadRequest('Roles notfound');

    existUser.roles = roles.map(role => role.id);
    existUser.save();

    return existUser.id;
  }

  /**
   * Generate Token
   * @param user IUser
   */
  private static generateToken(user: IUser) {
    const payload: IPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles.map(role => role.name),
    };
    return jwt.sign(payload, environment.TOKEN_SECRET, {
      expiresIn: environment.TOKEN_LIFETIME,
    });
  }

  /**
   * Generate refresh token
   * @param user IUser
   * @param ipAddress string
   */
  private static generateRefreshToken(user: IUser, ipAddress: string) {
    const expires = moment().add(ms(environment.REFRESH_TOKEN_LIFETIME), 'ms');
    return new REFRESH_TOKEN({
      expires,
      user: user.id,
      token: this.randomTokenString(),
      createdByIp: ipAddress,
    });
  }

  /**
   * Generate random token string
   * @param byteSize number
   */
  private static randomTokenString(byteSize = 40): string {
    return lib.WordArray.random(byteSize).toString(CryptoJS.enc.Hex);
  }
}
