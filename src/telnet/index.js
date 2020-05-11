const Telnet = require('telnet-client');

async function telnet() {
  let connection = new Telnet();
  let params = {
    host: '192.168.1.71',
    port: 55443,
    negotiationMandatory: false,
    timeout: 555000,
    debug: true
  };

  connection.on('ready', function(prompt) {
    connection.shell((err, stream) => {
      var cb = (data) => console.log(data.toString());
      stream.on('data', cb);
      stream.write('{"id": 1, "method": "toggle", "params": []}\n');
    });
  });

  connection.on('timeout', function() {
    console.log('socket timeout!');
    connection.end();
  });

  connection.on('close', function() {
    console.log('connection closed');
  });

  connection.connect(params);
}

module.exports = telnet;
