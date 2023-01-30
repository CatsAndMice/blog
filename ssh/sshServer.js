const execFn = require('./execFn.js')
const tinyAsyncPool = require('tiny-async-pool')
const commandNum = 4

async function asyncPoolAll(...args) {
    const results = [];
    for await (const result of tinyAsyncPool(...args)) {
        results.push(result);
    }
    return results;
}

const normal = '正常'

module.exports = (config, conn) => {
    return new Promise((resolve, reject) => {
        const exec = execFn(conn)
        conn.on('ready', async (err) => {
            if (err) reject(err)
            console.log('连接成功');
            const before = `echo "${config.password}" | sudo -S `
            const rol = new Array(commandNum).fill(normal)
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
            // 控制进程数为9，超出进程数报错
            await asyncPoolAll(3, dockerIds, async (id) => {
                const data = await exec(before + `docker logs --tail 200 ${id}`)
                if (data.includes('error')) {
                    if (rol[3] === normal) {
                        rol[3] = ''
                    }
                    rol[3] += `${id}异常;`
                    return true
                }
                return false
            });
            conn.end()
            resolve(rol)
        }).connect({
            ...config,
            readyTimeout: 5000
        });
    })

}