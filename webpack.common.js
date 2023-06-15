const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/ts/index.tsx',
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      { test: /\.css?$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less?$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss?$/, use: ['style-loader', 'css-loader', 'sass-loader'] },

      {
        test: /\.(ttf|eot|svg|woff2?)$/,
        use: 'url-loader?name=[name].[ext]',
      },
      {
        test: /\.(png|webp|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build', 'js'),
  },
};
