const express = require('express');
const { dnsQueue } = require('../queues/dns');

const router = express.Router();

router.get('/:hostname?', (req, res) => {

    const job = dnsQueue.createJob({ hostname: req.params.hostname || undefined })

    job.on('succeeded', (result) => {
      console.dir({data: result || {}, jobData: job.data})

      res.json({hostname: job.data.hostname, record: result.record })
    })

    job.save()//.then(output => res.json(output.data))
});

module.exports = router;
