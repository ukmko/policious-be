const jwt = require('jsonwebtoken');

const config = require('../config');
const {
  UnauthorizedError, ForbiddenError,
  wrapper,
  ERROR,
  asyncHandler,
} = require('../helpers')

const generateToken = async (payload) => {
  const verifyOption = {
    algorithm: 'RS256',
    audience: 'cdbb5c40-921c-4ba7-9b39-2b7679e1c130',
    issuer: 'ukmko',
    expiresIn: config.get('/jwtExpire'),
  };
  const token = jwt.sign(payload, config.get('/jwtSecret'), verifyOption);
  return token;
};

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const part = headers.authorization.split(' ');
    if (part.length === 2) {
      return part[1];
    }
  }

  return undefined;
};

const verifyToken = asyncHandler(async (req, res, next) => {
  const result = {
    err: null,
    data: null,
  };
  const verifyOption = {
    algorithm: 'RS256',
    audience: 'cdbb5c40-921c-4ba7-9b39-2b7679e1c130',
    issuer: 'ukmko',
  };

  const token = getToken(req.headers);
  if (!token) {
    result.err = new ForbiddenError('Invalid token!');
    return wrapper.response(res, 'fail', result, 'Invalid token!', ERROR.FORBIDDEN);
  }

  let decodedToken;
  try {
    decodedToken = await jwt.verify(token, config.get('/jwtSecret'), verifyOption);

    //TODO:: get user data from DB
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      result.err = new UnauthorizedError('Access token expired!');
      return wrapper.response(res, 'fail', result, 'Access token expired!', ERROR.UNAUTHORIZED);
    }
    result.err = new UnauthorizedError('Token is not valid!');
    return wrapper.response(res, 'fail', result, 'Token is not valid!', ERROR.UNAUTHORIZED);
  }
});

module.exports = {
  generateToken,
  verifyToken,
};
