module.exports = function phoneSide(server) {
  var io = require('socket.io')(server);
  var u = require('./util.js');

  function start() {
    setupSockets();
  }

  function setupSockets() {
    io.on('connection', function (socket) {
      u.logItOut('GOT A CONNECTION!');

      socket.on('my other event', function (data) {
        u.logItOut(data);
      });

      socket.on('*', function (event, data) {
        u.logItOut('Generic socket event handler: ', event, data);
      })
    });
  }

  function sendPlayMarcoToAll() {
      u.logItOut({
        action: "triggering_playMarcoToAll"
      });

      io.sockets.emit('playMarco', Date.now() + 0.0);

      u.logItOut({
        action: "triggered_playMarcoToAll",
        count: count
      });

      u.logItOut({"connected_sockets": Object.keys(io.sockets.connected)});
      return Object.keys(io.sockets.connected).length;
  }

 return {
    start: start,
    sendPlayMarcoToAll: sendPlayMarcoToAll
  };

};
