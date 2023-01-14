const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', (err) => {
    console.log('ready');
    conn.exec(`set timeout 1
 
    ## 切换root用户
    spawn su root
     
    ## 判断上述进程(su kevin)的输出结果中是否有“Password”的字符串(不区分大小写)。
    ## 若有则立即返回，否则就等待一段时间后返回，等待时长就是开头设置的1秒
    expect "Password:"
     
    ## 向上面的进程(su kevin)发送字符串中的密码, 并且自动敲Enter健(\r)
    send "ywja666\r"
     
    interact
    `, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
            conn.exec('systemctl status docker', (err, s) => {
                s.on('data', (data) => {
                    console.log(data.toString());
                })
            })
        }).on('data', (data) => {
            console.log(data);
        })
    });

}).connect({
    host: '47.111.8.143',
    port: 37219,
    username: 'inspe_user',
    password: 'ywja666',
    readyTimeout: 5000
});