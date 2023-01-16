const { Client } = require('ssh2');
const configs = require('./config.json')
const sshServer = require('./sshServer.js');

const conn = new Client();
const promises = []
const tables = [
    ['服务器ip', 'docker是否正常运行', 'docker远程访问', 'Docker日志是否有报错信息']
]
configs.forEach((config) => {
    promises.push(sshServer(config, conn))
})

Promise.all(promises).then((data) => {
    data.forEach((d) => {
        if (Array.isArray(d)) {
            tables.push(d)
        }
    })
    console.log(tables);
    // console.log(data);
})

