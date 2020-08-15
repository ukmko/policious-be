const mongoose = require('mongoose');

const config = require('../../config');
const { logger } = require('../utils');

const mongoDBConn = async () => {
  const conn = await mongoose.connect(config.get('/mongoDbUrl'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  logger.log('MongoDbConn', `DB connected to ${conn.connection.host}`, 'Mongoose Conn');
}

module.exports = mongoDBConn;