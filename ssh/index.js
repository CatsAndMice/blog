const { Client } = require('ssh2');
const configs = require('./config.json')
const sshServer = require('./sshServer.js');
const fs = require('fs');
const path = require('path');
const nodeXlsx = require('node-xlsx')


const promises = []

const tables = [
    ['服务器ip', 'docker是否正常运行', 'docker远程访问', 'Docker日志是否有报错信息']
]

configs.forEach((config) => {
    const conn = new Client();
    promises.push(sshServer(config, conn))
})

Promise.all(promises).then((data) => {
    data.forEach((d) => {
        if (Array.isArray(d)) {
            tables.push(d)
        }
    })
    const buffer = nodeXlsx.build([{ name: '巡检', data: tables }])
    const file = path.join(__dirname, '/server.xlsx')
    fs.writeFileSync(file, buffer, 'utf-8')
    console.log(file);
})

