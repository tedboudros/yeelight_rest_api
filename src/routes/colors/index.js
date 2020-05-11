const express = require('express'),
  telnet = require('../../telnet/');
router = express();

router.post('/setColor', (req, res) => {
  const { r, g, b } = req.body.color;
  telnet();
  return res.json({ r, g, b });
});

module.exports = router;
