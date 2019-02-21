const path = require('path');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/videoListStart.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        include: SRC_DIR,
        use: {
          loader: "babel-loader"
        }
      },
    ]
  }
};