const cors = require('cors');
const express = require('express');

const config = require('./config');
const routes = require('./routes');

const {
  logger,
  mongoDbConn,
} = require('./helpers');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoDbConn();

routes(app);

if (!module.parent) {
  const server = app.listen(config.get('/port'), () => {
    logger.log('server running', `App listening on port ${config.get('/port')}!`, 'initate application');
  });
}

process.on('unhandledRejection', (err) => {
  logger.log('unhandledRejection', err, 'Promise rejection');
});

module.exports = app;