var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('/home/lucas/codeschool/nodejs/index.html');
});

io.on('connection', function(client) {
  client.on('join', function(name) {
    client.nickname = name;
  });
  client.on('messages', function(data){
    var nickname = client.nickname;
    client.broadcast.emit("message", nickname + ": " + message);

    client.emit("messages", nickname + ": " + message);
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});
