import morgan from 'morgan';

export function logger() {
  return morgan(
    '[:date[clf]] :method :url :status :response-time ms - :res[content-length] Bytes',
  );
}
