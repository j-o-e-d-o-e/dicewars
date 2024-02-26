const {join} = require("path");

module.exports = {
  entry: {
    app: './js/app.js',
  },
  output: {
    path: join(__dirname, "../docs"),
    clean: true,
    filename: './js/app.js',
  },
};
