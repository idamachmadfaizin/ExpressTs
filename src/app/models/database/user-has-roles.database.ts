/**
 * @author Idam Achmad Faizin
 * @date 2020-11-24 15:32:59
 */

import { connection, Document, model, Schema } from 'mongoose';
import { IRole, IUser } from '.';

const userHasRolesSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
});

export interface IUserHasRoles extends Document {
  user: IUser;
  role: IRole;
}

const USER_HAS_ROLES = model<IUserHasRoles>('UserHasRoles', userHasRolesSchema);

/** Create this collection */
USER_HAS_ROLES.createCollection(undefined, (err) => {
  if (err) throw err;
});

export default USER_HAS_ROLES;
