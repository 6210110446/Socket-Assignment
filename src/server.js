const net = require('net');
const port = 5000;
const host = 'localhost';

const server = net.createServer();

const arr = [
                [" "," "," "],
                [" "," "," "],
                [" "," "," "]
            ]

server.listen(port, host, () => {
  console.log('HOST : ' + host + '\n' + 'PORT : ' + port);
});

let state = 0;
let count = 0;
let sockets = [];
server.on('connection', (socket) => {
  var clientAddress = socket.remoteAddress + ' : ' + socket.remotePort;
  console.log(' Clinet: ' + clientAddress + ' Connected!');
  sockets.push(socket);
  socket.on('data', (data) => {
    console.log('Client: ' + clientAddress + '\n' + 'Input : ' + data);

    switch (state) {
      case 0:
        if (data.toString() == 'pone') {
          socket.write('Player 1! Connected\n' + 'Wait for another player!')
          state = 1;
          console.log('state=' + state)
        }
        else {
          socket.write('INVALID : Enter "pone"')
        }
        break;

      case 1:
        if (data.toString() == 'ptwo') {
          socket.write('Player 2! Connected\n')
          sockets.forEach((sock) => {
             sock.write('Game Start!' + '\n');
          });
          state = 2;
          console.log('state=' + state)
          
        }
        else socket.write('INVALID: Enter "ptwo"')
        break;

      case 2:
        try {
          let i = parseInt(String(data).charAt(0));
          let j = parseInt(String(data).charAt(1));
          if (count < 9) {
            if(count%2 == 0 || count == 0) {
              arr[i][j] = "X";
              count++;
            }
            else if(count%2 == 1){
              arr[i][j] = "O";
              count++;
            }
          }
          console.log( '\n' +
                        '     |     |      ' + '\n' +
                        '  '+ arr[0][0]+'  |  '+ arr[0][1]+'  |  '+ arr[0][2]+'  ' + '\n' +
                        '_____|_____|_____ ' + '\n' +
                        '     |     |      ' + '\n' +
                        '  '+ arr[1][0]+'  |  '+ arr[1][1]+'  |  '+ arr[1][2]+'  ' + '\n' +
                        '_____|_____|_____ ' + '\n' +
                        '     |     |      ' + '\n' +
                        '  '+ arr[2][0]+'  |  '+ arr[2][1]+'  |  '+ arr[2][2]+'  ' + '\n' +
                        '     |     |      ')
          sockets.forEach((sock) => {
            sock.write('\n' +
                    '     |     |      ' + '\n' +
                    '  '+ arr[0][0]+'  |  '+ arr[0][1]+'  |  '+ arr[0][2]+'  ' + '\n' +
                    '_____|_____|_____ ' + '\n' +
                    '     |     |      ' + '\n' +
                    '  '+ arr[1][0]+'  |  '+ arr[1][1]+'  |  '+ arr[1][2]+'  ' + '\n' +
                    '_____|_____|_____ ' + '\n' +
                    '     |     |      ' + '\n' +
                    '  '+ arr[2][0]+'  |  '+ arr[2][1]+'  |  '+ arr[2][2]+'  ' + '\n' +
                    '     |     |      ' + '\n' +
                    'Player ' + ((count%2)+1) + ' Turn');            
          });
            
          if ((arr[0][0] != " " &&arr[0][0] == arr[0][1] && arr[0][0] == arr[0][2]) || 
              (arr[0][0] != " " &&arr[0][0] == arr[1][0] && arr[0][0] == arr[2][0]) ||
              (arr[0][0] != " " &&arr[0][0] == arr[1][1] && arr[0][0] == arr[2][2])) {
            sockets.forEach((sock) => {
                sock.write(arr[0][0] + ' Win!!!')
            });
            state = 3
          }
          else if ((arr[1][1] != " " && arr[1][1] == arr[0][1] && arr[1][1] == arr[2][1]) || 
                   (arr[1][1] != " " && arr[1][1] == arr[1][0] && arr[1][1] == arr[1][2])) {
            sockets.forEach((sock) => {
                sock.write(arr[1][1] + ' Win!!!');
            });
            state = 3
          }
          else if ((arr[2][2] != " " && arr[2][2] == arr[0][2] && arr[2][2] == arr[1][2]) || 
                   (arr[2][2] != " " && arr[2][2] == arr[2][0] && arr[2][2] == arr[2][1])) {
            sockets.forEach((sock) => {
                sock.write(arr[2][2] + ' Win!!!');
            });
            state = 3
          }
          else if ((arr[2][0] != " " && arr[2][0] == arr[1][1] && arr[2][0] == arr[0][2])) {
            sockets.forEach((sock) => {
                sock.write(arr[2][0] + ' Win!!!');
            });
            state = 3
          }
          else if (count == 9) {
            sockets.forEach((sock) => {
                sock.write('Draw!!!');
            });
            state = 3
          }
        } catch (e) {
          socket.write('Error');
          }

        break;
      case 3:
          socket.write('END');
          console.log('state =' + state);
          socket.end();
          socket.on('close', (data) => {
          });
        break;
    }
  });
});