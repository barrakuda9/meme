// const { default: Redis } = require("ioredis")
const { createClient } = require('redis')

const redis = createClient(process.env.REDIS_URL || {
    host: process.env.REDIS_HOST || '127.0.0.1',
    password: process.env.REDIS_PASSWORD || undefined,
    port: process.env.REDIS_PORT || 6379,
    db: process.env.REDIS_DB || 0,
})

module.exports = redis