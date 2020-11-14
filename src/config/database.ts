import mongoose from 'mongoose';
import { environment } from './environment';

export class Database {
  public static connect() {
    switch (environment.DB_CONNECTION) {
      case 'mongodb':
        mongodb();
        break;
      case 'mysql':
        break;
      default:
        break;
    }
  }
}

/**
 * Connect to mongodb
 */
function mongodb() {
  const url = environment.DB_HOST;
  mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err: any) =>
      err ? console.error(err) : console.log('Successfully connect to MongoDb'),
  );
}
