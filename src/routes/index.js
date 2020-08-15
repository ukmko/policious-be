const healthcheck = require('./healthcheck');
const user = require('./user');

const routers = [healthcheck];
const userRoutes = [...user];

module.exports = (app) => {
  routers.forEach((router) => app.use(router));

  userRoutes.forEach((router) => {
    app.use('/users', router);
  });
};