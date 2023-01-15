const { Client } = require('ssh2');
const conn = new Client();
const execFn = (c = conn) => {
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

const exec = execFn(conn)
conn.on('ready', async (err) => {
    if (err) throw err
    console.log('连接成功');
    const result = await exec('echo "ywja666" | sudo -S  docker ps -a -q')
    const dockerIds = result.split('\r')
    dockerIds.forEach(async (id) => {
        console.log(id);
        const data = await exec(`echo "ywja666" | sudo -S  docker logs -f --tail 200 ${id}`)
        const isError = data.includes('error')
        console.log(isError, '无',id)
    })
}).connect({
    host: '47.111.8.143',
    port: 37219,
    username: 'inspe_user',
    password: 'ywja666',
    readyTimeout: 5000
});