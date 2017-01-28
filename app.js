var app = require('express')();
var server = require('http').Server(app);

var bodyParser = require('body-parser');
var phoneSide = require ('./phoneSide.js');

server.listen((process.env.PORT || 5000));

// app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var logItOut = function(msg) {
  if (typeof(msg) === "string") {
    msg = { message: msg };
  }
  console.log(JSON.stringify(msg));
}

var echoFunc = function(req, res) {
  logItOut({
    "method": req.method,
    "body": req.body,
    "IP": req.ip,
    "params": req.params,
    "headers": req.headers
  });

  logItOut({
    action: "triggering_playMarcoToAll"
  });

  var count = phoneSide.sendPlayMarcoToAll();
  
  logItOut({
    action: "triggered_playMarcoToAll",
    count: count
  });
  res.send({
    sent: "playMarco",
    to: "all",
    count: count
  });
};

app.get('/', echoFunc);
app.post('/', echoFunc);

phoneSide.start();

console.log('APP STARTED');
