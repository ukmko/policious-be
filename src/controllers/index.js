const healthcheckController = require('./healthcheck');
const userController = require('./user');

module.exports = {
  healthcheckController,
  ...userController,
};