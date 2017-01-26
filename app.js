var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

server.listen((process.env.PORT || 5000));

// app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var echoFunc = function(req, res) {
  var echo = "PARAMS: " + req.params.toString() + "\n";
  echo += "HEADERS: " + req.headers.toString() + "\n";
  echo += "BODY: " + req.body.toString() + "\n";
  console.log("GOT REQUEST: ", req.method);
  console.log("GOT BODY");
  console.log(req.body);
  console.log("FROM IP:", req.ip);
  console.log("PARAMS", req.params);
  console.log("HEADERS:", req.headers);
  res.send(echo);
}
app.get('/', echoFunc);
app.post('/', echoFunc);



var i = 0.0;
io.on('connection', function (socket) {
  console.log('GOT A CONNECTION!');

  console.log('SENDING AN EMIT THINGY');
  socket.emit('currentAmount', 123.30);
  socket.on('my other event', function (data) {
    console.log(data);
  });


  // setInterval(function () {
  //   i += 1.0;
  //   console.log("Sending a thing...");
  //   socket.emit('currentAmount', 123.0 + i)
  // }, 3000)
});


console.log('APP STARTED');
