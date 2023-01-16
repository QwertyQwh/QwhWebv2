const path = require('path');
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
};