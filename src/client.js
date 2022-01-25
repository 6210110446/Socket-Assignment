var net = require('net');
var HOST = 'localhost';
var PORT = 5000;
var client = new net.Socket();

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

client.connect(PORT, HOST, function () {
  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  readline.question('\n', input => {
    client.write(input);
  })
});

client.on('data', function (data) {
  readline.question('\n', input => {
    client.write(input);
  })
});

client.on('data', function (data) {
  console.log('Game Status: ' + data);
});

client.on('close', function () {
  console.log('Disconnected');
  client.destroy();
});
