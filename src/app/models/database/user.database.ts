import { Document, model, Schema } from 'mongoose';
import { ITimestamps } from '../interfaces/timestamps.interface';

const userSchema = new Schema(
  {
    name: { type: String, required: true, min: 4, max: 128 },
    email: { type: String, required: true, min: 8, max: 128 },
    password: { type: String, required: true, min: 8 },
    // books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  },
  {
    timestamps: true,
  },
)
  /** Delete/Ignore Column if returned toJSON */
  .set('toJSON', {
    transform: (doc, ret, options) => {
      delete ret.password;
    },
  });

export interface IUser extends ITimestamps, Document {
  name: string;
  email: string;
  password: string;
}

const USER = model<IUser>('User', userSchema);

export default USER;
