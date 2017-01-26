var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var i = 0.0;
io.on('connection', function (socket) {
  console.log('GOT A CONNECTION!');

  console.log('SENDING AN EMIT THINGY');
  socket.emit('currentAmount', 123.30);
  socket.on('my other event', function (data) {
    console.log(data);
  });


  setInterval(function () {
    i += 1.0;
    console.log("Sending a thing...");
    socket.emit('currentAmount', 123.0 + i)
  }, 3000)
});


console.log('APP STARTED');
