const express = require('express');
const { echoQueue } = require('../queues/echo');

const router = express.Router();

router.get('/', (req, res) => {
    const job = echoQueue.createJob({ message: 'Welcome, home 😀!' }).save()

    job.then((result) => res.json(result.data))
});

router.get('/:message', (req, res) => {
    echoQueue.createJob({ message: req.params.message || 'Hello, world!1!' }).save().then((result) => {
      res.json(result.data)
    })
});

module.exports = router;
