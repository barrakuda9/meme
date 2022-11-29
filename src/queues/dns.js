const Queue = require('bee-queue')
const redis = require('../services/redis')
const execa = require('execa')
const { dig } = require('../plugins')

const DNS_QUEUE_NAME = 'DNS'

const dnsQueue = new Queue(DNS_QUEUE_NAME, {redis: redis})

dnsQueue.on('ready', () => console.log('Ready!'))

dnsQueue.on('failed', (job, err) => console.error(`<DnsJob-${job.id}> failed: ${err.name} (${err.message})`))

dnsQueue.on('succeeded', (job, result) => {
    console.log(`<DnsJob-${job.id}> for ${result.hostname} succeeded: ${result.record}`)
})

dnsQueue.process(async (job, done) => {
    const {hostname} = job.data

    const records = await dig({hostname, type: 'a'})

    console.log(`--> [${job.data.hostname}] = ${records.length}`)

    return done(null, {hostname, records})
})

module.exports = { DNS_QUEUE_NAME, dnsQueue }