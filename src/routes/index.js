const express = require('express'),
  router = express(),
  colors = require('./colors/');

router.use('/colors', colors);

module.exports = router;
