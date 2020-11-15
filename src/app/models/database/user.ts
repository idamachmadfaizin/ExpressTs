import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      max: 128,
    },
    email: {
      type: String,
      required: true,
      min: 8,
      max: 128,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
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

const USER = mongoose.model('User', userSchema);

export default USER;
