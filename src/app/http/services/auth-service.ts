import USER from './../../models/database/user';

export class AuthService {
  public static async checkEmailExist(email: string) {
    try {
      const emailExist = await USER.findOne({ email });
      return emailExist;
    } catch (err) {
      throw err;
    }
  }
}
