module.exports = (c = conn) => {
    return (command) => {
        return new Promise((resolve, reject) => {
            c.exec(command, (err, stream) => {
                if (err) {
                    reject(err)
                    return
                }
                let result = ''
                stream.on('close', () => {
                    resolve(String(result))
                }).on('data', (data) => {
                    result += data
                })
            })
        })
    }
}