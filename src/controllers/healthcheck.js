const {
  asyncHandler,
  wrapper,
} = require('../helpers');

const healthcheckController = asyncHandler(async (req, res, next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  return wrapper.response(res, 'success', wrapper.data(healthcheck), 'Healtcheck success');
});

module.exports = healthcheckController;