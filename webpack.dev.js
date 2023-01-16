const path = require('path');
const common = require("./webpack.common")
var HtmlWebpackPlugin = require("html-webpack-plugin")
const {merge} = require("webpack-merge")
const CopyPlugin = require("copy-webpack-plugin");
module.exports = merge(common, {
  mode: "development",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]'
  },
  plugins:[new HtmlWebpackPlugin({
    template: "./src/index.html"
 })
 ,new CopyPlugin({
  patterns: [
      { from: "src/assets/model",to:"assets/model" }
  ]})
],
  module:{
    rules:[
      {
        test: /\.css/,
        use: ["style-loader","css-loader"]
      },
      {
        test: /\.(png|jpg|gif|glb)$/,
        type: 'asset/resource'
      }
    ]
  },
});