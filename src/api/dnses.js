const express = require('express');
const { dnsQueue } = require('../queues/dns');

const router = express.Router();

router.get('/:hostname?', async (req, res) => {
    console.log(`requesting dns`)

    const job = await dnsQueue.createJob({ hostname: req.params.hostname }).save()
  
    job.on('succeeded', (result) => {
      console.log(`--> A-record for ${job.data.hostname} is ${result.records.length}`)

      res.json({hostname: job.data.hostname, records: result.records })
    })
});

module.exports = router;
