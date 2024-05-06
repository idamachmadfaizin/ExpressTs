import logger from 'morgan';

export function morgan() {
	return logger(
		'[:date[clf]] :method :url :status :response-time ms - :res[content-length] Bytes',
	);
}
