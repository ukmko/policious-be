const router = require('express').Router();

const { healthcheckController } = require('../controllers');

router.get('/healthcheck', healthcheckController);

module.exports = router;