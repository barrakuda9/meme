const express = require('express');
const Scanner = require('../../plugins/scanner');
const { dnsQueue } = require('../../queues/dns');

const DEFAULT_DNS_SCAN_TYPES = [
  'a',
  'mx',
  'txt',
  'aaaa',
  '_domainkey'
]

const router = express.Router();


router.get('/scanner/:hostnames/:types?', async (req, res) => {

  const hostnames = !req.params.hostnames ? ['localhost'] : req.params.hostnames.split(',')
  const types = !req.params.types ? DEFAULT_DNS_SCAN_TYPES : req.params.types.split(',')
  
  const scanner = new Scanner(hostnames)

  const records = await scanner.dns(types)

  return res.json({ hostnames, types, records })
});

router.get('/dig/:hostname', (req, res) => {
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
