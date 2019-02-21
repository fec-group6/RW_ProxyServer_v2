var path = require('path');
var source = path.join(__dirname, '/client');
var dest = path.join(__dirname, '/public');

module.exports = {
  entry: `${source}/videotest.js`,
  output: {
    filename: 'bundle.js',
    path: dest
  },
  module: {
    rules: [
      {
        test: /\.(jsx)$/,
        include: source,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }]
      }
    ]
  }
};

// ,
//         {
//           loader: 'stylelint-custom-processor-loader'
//         }