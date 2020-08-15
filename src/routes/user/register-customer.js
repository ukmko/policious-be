const router = require('express').Router();
const { registerCustomerController } = require('../../controllers');

router.post('/register-customer', registerCustomerController);

module.exports = router;