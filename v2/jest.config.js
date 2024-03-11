module.exports = {
  roots: ['<rootDir>/specs'],
  testEnvironment: 'jsdom',
  testRegex: '/*.test.js$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
};
