import secure from 'cors';

export function cors() {
	return secure({
		origin: process.env.NODE_ENV ? `${process.env.APP_URL}` : true,
		credentials: true,
	});
}
