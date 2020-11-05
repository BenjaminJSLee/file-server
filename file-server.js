const net = require('net');
const fs = require('fs');
const { PORT } = require('./constants');

const server = net.createServer();

server.on('connection', (client) => {
  console.log('New client connected!');
  client.setEncoding('utf8'); // interpret data as text
  client.on('data', (file) => {
    fs.access(file, (err) => {
      if (err) {
        client.write(err.message);
      } else {
        fs.readFile(file, 'utf8', (err, data) => {
          if (!err) client.write(data);
          else  client.write(err.message);
        });
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
