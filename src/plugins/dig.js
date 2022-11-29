const {execaCommand: execa} = require('execa')

const dig = async ({hostname, type, raw }) => {

    const command = `+short ${hostname} ${type || 'a'}`

    console.warn(`==> ${command}`)

    const { stdout } = await execa('dig', command)

    return raw === true ? stdout : `${String(stdout)}`.trim().split("\n").map(v => (v || '').trim())
}

module.exports = dig