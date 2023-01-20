const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = {
  entry: {
    main:'./src/index.js',
  },
  module:{
    rules:[
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
       },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, './dist'),
    open: true,
    hot: true,
    port: 8090,
  },
  plugins:[
    new CleanWebpackPlugin()
    ,new CopyPlugin({
      patterns: [
          { from: "src/assets/model",to:"assets/model" }
      ]}),
    new webpack.HotModuleReplacementPlugin(),
  ]
};