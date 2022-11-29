const express = require('express');
const { echoQueue } = require('../queues/echo');

const router = express.Router();

router.get('/', async (req, res) => {

    let i=0;

    for (i=0; i<250;i++) {
        echoQueue.createJob({ message: `Welcome, home x ${i+1}😀!` }).save()
    }

    const job = echoQueue.createJob({ message: 'Welcome, home 😀!' }).save()

    //job.then((result) => res.json(result.data))

    res.json({message: `Created 11 jobs!`})
});

router.get('/:message', (req, res) => {
    echoQueue.createJob({ message: req.params.message || 'Hello, world!1!' }).save().then((result) => {
      res.json(result.data)
    })
});

module.exports = router;
