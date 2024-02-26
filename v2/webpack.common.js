const path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
  },
  output: {
    path: path.resolve(__dirname, '../docs'),
    clean: true,
    filename: './js/app.js',
  },
};
