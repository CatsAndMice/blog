const execFn = require('./execFn.js')

const commandNum = 4
module.exports = (config, conn) => {
    return new Promise((resolve, reject) => {
        const exec = execFn(conn)
        conn.on('ready', async (err) => {
            if (err) reject(err)
            console.log('连接成功');
            const before = `echo "${config.password}" | sudo -S `
            const rol = new Array(commandNum).fill('正常')
            rol[0] = config.host
            exec(before + 'systemctl status docker').then((content) => {
                const isRun = String(content).includes('active (running)')
                if (!isRun) {
                    rol[1] = '异常'
                }
            })

            exec(before + 'docker info |grep -A 5 "WARNING"').then((content) => {
                if (content) {
                    rol[2] = '异常'
                }
            })

            const result = await exec(before + 'docker ps -a -q')
            const dockerIds = result.split('\n').filter(r => r)
            console.log(dockerIds);
            const len = dockerIds.length - 1
            let num = 0
            dockerIds.forEach(id => {
                exec(`echo "ywja666" | sudo -S  docker logs -f --tail 200 ${id}`).then((data) => {
                    num++
                    if (data.includes('error')) {
                        rol[3] = "异常"
                    }
                    if (num === len) {
                        conn.end()
                        resolve(rol)
                    }

                })
            })

        }).connect({
            ...config,
            readyTimeout: 5000
        });
    })

}