/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@controllers/(.*)$": ["<rootDir>/src/controllers/$1"],
    "^@middlewares/(.*)$": ["<rootDir>/src/middlewares/$1"],
    "^@models/(.*)$": ["<rootDir>/src/models/$1"],
    "^@routes/(.*)$": ["<rootDir>/src/routes/$1"],
    "^@services/(.*)$": ["<rootDir>/src/services/$1"],
    "^@utils/(.*)$": ["<rootDir>/src/utils/$1"],
    "^@config/(.*)$": ["<rootDir>/src/config/$1"],
    "^@server$": ["<rootDir>/src/index"],
  }
};