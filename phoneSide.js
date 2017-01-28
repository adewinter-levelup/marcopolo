var io = require('socket.io')(server);

module.exports = (function phoneSide() {
  function start() {
    setupSockets();
  }

  function setupSockets() {
    io.on('connection', function (socket) {
      console.log('GOT A CONNECTION!');

      socket.on('my other event', function (data) {
        console.log(data);
      });
    });
  }

  function sendPlayMarcoToAll() {
      io.sockets.emit('playMarco', Date.now());
      return io.sockets.length;
  }

 return {
    start: start,
    sendPlayMarcoToAll: sendPlayMarcoToAll
  };

})();
