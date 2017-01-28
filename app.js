var app = require('express')();
var server = require('http').Server(app);
var u = require('./util.js');
var bodyParser = require('body-parser');
var phoneSide = require ('./phoneSide.js')(server);

server.listen((process.env.PORT || 5000));

// app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function generateResponseObject() {
  return {
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "Keep an ear out!"
      },
      "shouldEndSession": true
    }
  }

}

var alexaReceiver = function(req, res) {
  u.logItOut({
    "method": req.method,
    "body": req.body,
    "IP": req.ip,
    "params": req.params,
    "headers": req.headers
  });

  var count = phoneSide.sendPlayMarcoToAll();

  res.send(generateResponseObject());
};

app.get('/', alexaReceiver);
app.post('/', alexaReceiver);

phoneSide.start();

u.logItOut('APP STARTED');
