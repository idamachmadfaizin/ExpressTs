import CopyPlugin from 'copy-webpack-plugin';
import debugging from 'debug';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

const debug = debugging('webpack');

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  // #region Removing dist
  debug('Removing old build.');
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    fs.rm(distDir, { recursive: true }, (err) => {
      if (err) debug('Error removing old build', err);
    });
  }
  debug('Removing success.');
  // #endregion
}

const config: webpack.Configuration = {
  entry: path.join(__dirname, 'src', 'index.ts'),
  mode: isProd ? 'production' : 'development',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
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
        { from: path.join(__dirname, 'src/public'), to: 'public' },
        { from: path.join(__dirname, 'src/views'), to: 'views' },
      ],
    }),
  ],
};

export default config;
