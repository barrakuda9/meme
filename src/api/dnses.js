const express = require('express');
const { dnsQueue } = require('../queues/dns');

const router = express.Router();

router.get('/:hostname?', async (req, res) => {
    console.log(`requesting dns`)

    const job = await dnsQueue.createJob({ hostname: req.params.hostname }).save()
  
    job.on('succeeded', (result) => {
      console.log(`--> A-record for ${job.data.hostname} is ${result.record}`)

      res.json({hostname: job.data.hostname, record: result.record })
    })
});

module.exports = router;
