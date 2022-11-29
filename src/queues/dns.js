const Queue = require('bee-queue')
const redis = require('../services/redis')
const execa = require('execa')

const DNS_QUEUE_NAME = 'DNS'

const dnsQueue = new Queue(DNS_QUEUE_NAME, {redis: redis})

dnsQueue.on('ready', () => console.log('Ready!'))

dnsQueue.on('failed', (job, err) => console.error(`<DnsJob-${job.id}> failed: ${err.name} (${err.message})`))

dnsQueue.on('succeeded', (job, result) => {
    console.log(`<DnsJob-${job.id}> for ${result.hostname} succeeded: ${result.record}`)
})

dnsQueue.process((job, done) => {
    const {hostname} = job.data

    const {stdout: record} = execa.execaCommandSync('dig +short', [job.data.hostname, 'a'])

    console.log(`--> [${job.data.hostname}] = ${record}`)

    return done(null, {hostname, record})
})

module.exports = { DNS_QUEUE_NAME, dnsQueue }