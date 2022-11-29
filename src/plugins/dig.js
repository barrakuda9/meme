const {execaCommandSync: exec} = require('execa')

const dig = async ({hostname, type, raw }) => {

    const {stdout: data} = exec('dig', ['+short', hostname || 'localhost', type || 'a'])

    return raw === true ? data : `${String(data)}`.trim().split("\n")
}

module.exports = dig