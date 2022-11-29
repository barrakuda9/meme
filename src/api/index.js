const express = require('express');

const emojis = require('./emojis');
const echos = require('./echos')
const hosts = require('./hosts')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/echos', echos)
router.use('/hosts', hosts)

module.exports = router;
