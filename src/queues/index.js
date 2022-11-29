const { default: Redis } = require("ioredis")

const redis = new Redis(process.env.REDIS_URL)

const useQueue = async ({name}) => {

}

module.exports = { useQueue}