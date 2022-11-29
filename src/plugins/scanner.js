const dig = require("./dig");

class Scanner {
    hosts;

    constructor(hostOrHosts) {
        this.hosts = typeof hostOrHosts === 'string' ? [hostOrHosts] : hostOrHosts
    }

    async dns(typeOrTypes) {
        const types = !typeOrTypes ? [] : (typeof typeOrTypes === 'string' ? [typeOrTypes] : typeOrTypes)

        let results = {}

        for await (const type of types) {
            console.log(`-- > fetching ${type}-records for ${this.hosts.length} hosts`)
            results[type] = {}

            for (const host of this.hosts) {
                console.log(`   > checking ${host}`)
                results[type][host] = await dig({hostname: host, type})
            }
        }

        return results
    }
}

module.exports = Scanner