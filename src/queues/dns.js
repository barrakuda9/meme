const Queue = require('bee-queue')
const redis = require('../services/redis')
const execa = require('execa')

const DNS_QUEUE_NAME = 'DNS'

const dnsQueue = new Queue(DNS_QUEUE_NAME, {redis: redis})

dnsQueue.on('succeeded', (job) => console.log(`<DnsJob-${job.id}> for ${job.data.hostname} succeeded: ${job.data.value}`))

dnsQueue.process(async (job, done) => {

    const value = execa.execaCommandSync('dig +short', [job.data.hostname, 'a']).split('\n')

    console.log(`--> [${job.data.hostname}] = ${value.stdout}`)

    return done(null, {hostname: job.data.hostname, record: value.stdout})
})

module.exports = { DNS_QUEUE_NAME, dnsQueue }