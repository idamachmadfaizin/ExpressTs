/**
 * Role database model
 * @author Idam Achmad Faizin
 * @date 2020-11-24 14:59:42
 */

import { Document, model, Schema } from 'mongoose';
import { ITimestamps } from '../interfaces/timestamps.interface';

const roleSchema = new Schema(
  {
    name: { type: String, required: true, max: 128 },
  },
  {
    timestamps: true,
  },
).set('toJSON', {
  versionKey: false,
});

export interface IRole extends ITimestamps, Document {
  name: string;
}

const ROLE = model<IRole>('Role', roleSchema);

/** Create this collection */
ROLE.createCollection(undefined, (err) => {
  if (err) throw err;
});

export default ROLE;
