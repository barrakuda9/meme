const express = require('express');
const { dnsQueue } = require('../../queues/dns');

const router = express.Router();

router.get('/:hostname', (req, res) => {
    console.log(`requesting dns`)

    const { hostname } = req.params || { hostname: 'localhost' }

    dnsQueue.createJob({ hostname }).timeout(5000).retries(3).save().then((job) => {

      job.once('succeeded', (result, j) => {
        console.dir({hostname, result, j})

        console.log(`--> A-record for ${hostname} is ${result}`)
  
        res.json({hostname, records: result })
      })

      job.on('failed', (err) => res.json(err))
    })

});

module.exports = router;
