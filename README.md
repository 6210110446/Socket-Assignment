# Socket-Assignment
311-PSU
# Tic-Tac-Toe features
--------------
- Tic-Tac-Toe server สำหรับ 2 client sides as players
- Clients สามารถเลือกได้ว่าจะเป็น pone(X) หรือ ptwo(O)
- แสดงบอร์ดในการเล่น

## การเข้าสู่ Server
#### server.js

            const net = require('net');
            const port = 5000;
            const host = 'localhost';
            const server = net.createServer();
    	    server.listen(port, host, () => { 
				console.log('HOST : ' + host + '\n' + 'PORT : ' + port);
			});

#### client.js

    var net = require('net');
    var HOST = 'localhost';
    var PORT = 5000;
    var client = new net.Socket();

#### แสดงผล

    HOST : localhost
    PORT : 5000
     Clinet: 127.0.0.1 : 60431 Connected!
     Clinet: 127.0.0.1 : 60434 Connected!

###### Client จะ join server และสร้าง socket ในตัวอย่างคือ localhost:60431 และ localhost:60434


## การเลือกฝั่งผู้เล่น

#### server.js

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
##### Client side input pone
    Game Status: Player 1! Connected
    Wait for another player!
##### Another client side input ptwo
    Game Status: Player 2! Connected
    Game Status: Game Start!
##### Server side
    Client: 127.0.0.1 : 60431
    Input : pone
    state=1
    Client: 127.0.0.1 : 60434
    Input : ptwo
    state=2
##### Client side input ptwo without pone in the room

    Game Status: INVALID : Enter "pone"

##### Adjust pone as X and ptwo as O

     if (count < 9) {
                if(count%2 == 0 || count == 0) {
                  arr[i][j] = "X";
                  count++;
                }
                else if(count%2 == 1){
                  arr[i][j] = "O";
                  count++;
                }
###### เนื่องจากเป็นการผลัดการเล่นเป็น turn-based จึงสามารถกำหนดให้ผู้เล่นที่เล่น turn แรก (0,2,4,6,8) เป็น X และผู้เล่นอีกคนเป็น O (1,3,5,7)


## Game Board
#### Create game board on server.js
##### Create array 3x3

    const arr = [
                    [" "," "," "],
                    [" "," "," "],
                    [" "," "," "]
                ]
##### Design game board

              let i = parseInt(String(data).charAt(0));
              let j = parseInt(String(data).charAt(1));

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


## Game Rule
##### Input Method
                  let i = parseInt(String(data).charAt(0));
                  let j = parseInt(String(data).charAt(1));
##### example

![](https://i.ibb.co/mT0M7my/Screenshot-2022-01-25-112123.jpg)
##### Win condition
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
##### example
![](https://i.ibb.co/Jdw0zXJ/Screenshot-2022-01-25-112259.jpg)

##### Draw ก็ต่อเมื่อใน turn ที่ 9 ยังไม่มีผู้ชนะ

    else if (count == 9) {
                sockets.forEach((sock) => {
                    sock.write('Draw!!!');
                });
                state = 3
##### example
![](https://i.ibb.co/HH0JQLY/Screenshot-2022-01-25-112816.jpg)

### FlowChart

![](https://i.ibb.co/fvhJ36C/Screenshot-2022-01-25-115320.jpg)

```flow
st=>start: IDLE 
op=>operation: Waiting for player
cond=>condition: ptwo and pone ?
op2=>operation: Player input coordinate
cond2=>condition: Any player win or draw?
e=>end: End

st->op->cond
cond(yes)->op2
cond(no)->op
op2->cond2
cond2(yes)->e
cond2(no)->op2

```

### Sequence Diagram
![](https://i.ibb.co/wJLdtKt/Screenshot-2022-01-25-113004.jpg)

### End
