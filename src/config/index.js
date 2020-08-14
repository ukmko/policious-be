require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  appEnv: process.env.ENV,
  baseUrl: process.env.URL,
  mongoDbUrl: process.env.MONGO_DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE,
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);