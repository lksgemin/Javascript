var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('join', function(name) {
    socket.nickname = name;
    io.emit('chat message', name + ' entrou na sala!');
  });
  socket.on('chat message', function(msg){
    var nickname = socket.nickname;
    io.emit('chat message', nickname + ':' + msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
