const Queue = require('bee-queue')
const redis = require('../services/redis')

const ECHO_QUEUE_NAME = 'ECHO'

const echoQueue = new Queue(ECHO_QUEUE_NAME, {redis: redis})

echoQueue.on('succeeded', (job) => console.log(`<EchoJob-${job.id}> succeeded`))

echoQueue.process(async (job, done) => {
    const message = `Echo, ${job.data.message}`
    
    console.log(`--> ${message}`)

    return done(null, message)
})

module.exports = { ECHO_QUEUE_NAME, echoQueue }