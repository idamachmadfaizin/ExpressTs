/**
 * Refresh token database model
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:55:56
 */

import { Document, model, Schema } from 'mongoose';
import { ITimestamps } from './../interfaces/timestamps.interface';
import { IUser } from './user.database';

const refreshTokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    token: { type: String, required: true },
    expires: { type: Number, required: true },
    createdByIp: { type: String, required: true },
    revoked: { type: Number },
    revokedByIp: { type: String },
    replacedByToken: { type: String },
  },
  {
    timestamps: true,
  },
).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc: any, ret: any) => {
    delete ret._id;
    delete ret.id;
    delete ret.user;
  },
});

refreshTokenSchema.virtual('isExpired').get(function (this: IRefreshToken) {
  return Date.now() >= this.expires;
});
refreshTokenSchema.virtual('isActive').get(function (this: IRefreshToken) {
  return !this.revoked && !this.isExpired;
});

export interface IRefreshToken extends ITimestamps, Document {
  user: IUser;
  token: string;
  expires: number;
  createdByIp: string;
  revoked: number;
  revokedByIp: string;
  replacedByToken: string;

  isExpired: boolean;
  isActive: boolean;
}

const REFRESH_TOKEN = model<IRefreshToken>('RefreshToken', refreshTokenSchema);

/** Create this collection */
REFRESH_TOKEN.createCollection(undefined, (err) => {
  if (err) throw err;
});

export default REFRESH_TOKEN;
