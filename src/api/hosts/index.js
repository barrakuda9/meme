const express = require('express');
const scans = require('./scans')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hosts API - 👋🌎🌍🌏',
    hosts: [
        'fhost.cc',
        'dnz.ink',
        'anyhoster.eu'
    ]
  });
});

router.use('/scans', scans)

module.exports = router;
