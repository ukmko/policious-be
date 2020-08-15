const {
  asyncHandler,
  wrapper,
  BadRequestError,
} = require('../../helpers');
const User = require('../../model/User');

const registerCustomer = asyncHandler(async (req, res,) => {
  const { phone } = req.body;

  const user = await User.findOne({ phone });
  if (user) {
    return wrapper.response(res, 'fail', wrapper.error(new BadRequestError('Phone number has been taken')));
  }

  await User.create(req.body);

  return wrapper.response(res, 'success', wrapper.data({}), 'Register customer success');
});

module.exports = registerCustomer;