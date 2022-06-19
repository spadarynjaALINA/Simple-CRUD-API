import path from 'path';

const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    port:5000,
    contentBase: path.join(__dirname, 'public'),
  },
};

const esLintPlugin = (isDev) => isDev ? [] : [ new ESLintPlugin({ extensions: ['ts', 'js'] }) ];

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
   entry: {
    main: './src/server.ts',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: (pathData) => {
    const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
    return `${filepath}/[base]`;
},
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  ...devServer(development)
});
