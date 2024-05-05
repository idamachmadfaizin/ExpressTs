import CopyPlugin from 'copy-webpack-plugin';
import * as fs from 'fs';
import path from 'path';
import * as webpack from 'webpack';
// const webpackNodeExternals = require('webpack-node-externals');

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

const config: webpack.Configuration = {
	entry: './src/index.ts',
	mode: 'production',
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
			patterns: [{ from: path.resolve(__dirname, 'src/public'), to: 'public' }],
		}),
	],
	// externals: [ webpackNodeExternals() ],
};

export default config;
