var express = require('express');
var bodyParser = require('body-parser');
const { dialogflow } = require('actions-on-google');

var path, NodeSSH, ssh, fs;

fs = require('fs');
path = require('path');
NodeSSH = require('node-ssh');
ssh = new NodeSSH();

const app = dialogflow();

app.intent('Default Welcome Intent', conv => {
    conv.ask("hi user");
    conv.ask("to turn on or off the light, say 'turn on the light' or 'turn off the light'");
});

app.intent('light', async (conv, { operation, device }) => {
    var res = await ssh.connect({
        host: '192.168.0.2',
        username: 'pi',
        password: 'pi',
        privateKey: fs.readFileSync('id_rsa', 'utf8')
    });
    var res2 = await ssh.execCommand("python light.py " + operation);
    conv.ask("successfully turned " + operation + " the " + device);
});

express().use(bodyParser.json(), app).listen(3000);
console.log("3000");
