const { jwtAuthHelper } = require('../auth');
const healthcheck = require('./healthcheck');

// No auth 
const routers = [healthcheck];

module.exports = (app) => {
  routers.forEach((router) => app.use(router));

  app.use(jwtAuthHelper.verifyToken);
};