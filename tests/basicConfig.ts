import { environment } from '../src/config/environment';
import mongoose from 'mongoose';

export function basicConfig() {
  beforeAll(async () => {
    const url = environment.DB_HOST;
    await mongoose.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err: any) => (err ? console.error(err) : null),
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
}
