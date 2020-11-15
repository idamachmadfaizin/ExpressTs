import moment from 'moment';
import ms from 'ms';
import { environment } from '../../../config/environment';
import REFRESH_TOKEN from '../../models/database/refresh-token.database';
import USER, { IUser } from '../../models/database/user.database';
import { Unauthorized } from '../middleware/error/unauthorized';
import CryptoJS, { lib } from 'crypto-js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthService {
  public static async checkEmailExist(email: string) {
    try {
      const emailExist = await USER.findOne({ email });
      return emailExist;
    } catch (err) {
      throw err;
    }
  }

  public static async authenticateAsync(
    email: string,
    password: string,
    ipAddress: string,
  ) {
    if (!email && !password && !ipAddress) return null;

    const userExist = await USER.findOne({ email });
    if (!userExist) return null;

    const validPassword = bcrypt.compareSync(password, userExist.password);
    if (!validPassword) return null;

    const token = this.generateToken(userExist);
    const refreshToken = this.generateRefreshToken(userExist, ipAddress);

    refreshToken.save();

    return { token, refreshToken };
  }

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

  private static generateToken(user: IUser) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      environment.TOKEN_SECRET,
      { expiresIn: environment.TOKEN_LIFETIME },
    );
  }

  private static generateRefreshToken(user: IUser, ipAddress: string) {
    const expires = moment().add(ms(environment.REFRESH_TOKEN_LIFETIME), 'ms');
    return new REFRESH_TOKEN({
      expires,
      user: user.id,
      token: this.randomTokenString(),
      createdByIp: ipAddress,
    });
  }
  private static randomTokenString(byteSize = 40): string {
    return lib.WordArray.random(byteSize).toString(CryptoJS.enc.Hex);
  }
}
