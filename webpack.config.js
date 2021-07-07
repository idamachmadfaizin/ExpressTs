import * as path from 'path';
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/www.ts',
  mode: 'production',
  watch: false,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'www.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  externals: [ webpackNodeExternals() ],
}

// const config: webpack.Configuration = {
//   mode: 'production',
//   entry: './src/www.ts',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'www.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         use: [
//           'ts-loader',
//         ]
//       }
//     ]
//   },
//   externalsPresets: {node: true},
//   externals: [ webpackNodeExternals() ],
// };
// export default config;
