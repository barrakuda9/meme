const dig = async ({hostname, type }) => {

    const {stdout: data} = execa.execaCommandSync('dig', [
        '+short',
        hostname || 'localhost',
        type || 'a'
    ])

    return `${String(data)}`.trim().split("\n")
}

module.exports = dig