var path, NodeSSH, ssh, fs

fs = require('fs')
path = require('path')
NodeSSH = require('node-ssh')
ssh = new NodeSSH()

ssh.connect({
  host: '192.168.0.2',
  username: 'pi',
  password: 'pi',
  privateKey: fs.readFileSync('id_rsa', 'utf8')
}).then(() => {
  console.log("yaay");
  ssh.execCommand("python light.py off").then(function (result) {
    console.log(result);
  });
}, (err) => {
  console.log(err);
})