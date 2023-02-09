const path = require('path');
const fs = require('fs');
// const webpackNodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

// #region Removing dist
console.info('Removing old build.');
const distDir = path.resolve(__dirname, 'dist');
if (fs.existsSync(distDir)) {
	fs.rm(distDir, { recursive: true }, (err) => {
		if (err) console.error('Error removing old build', err);
	});
}
console.info('Removing success.');
// #endregion

const isProduction = process.env.NODE_ENV == 'production';

module.exports = {
	entry: './src/index.ts',
	mode: isProduction ? 'production' : 'development',
	watch: false,
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'dist/webpack'),
		filename: 'index.js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				use: 'ts-loader',
				exclude: ['/node_modules/'],
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: path.resolve(__dirname, 'src/assets'), to: 'assets' },
				{ from: path.resolve(__dirname, 'src/public'), to: 'public' },
			],
		}),
	],
	// externals: [ webpackNodeExternals() ],
};
