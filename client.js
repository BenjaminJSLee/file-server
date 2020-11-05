const net = require('net');
const { IP, PORT } = require('./constants');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Request a file: "
});

const connect = function() {
  const conn = net.createConnection({
    host: IP,
    port: PORT
  });
  rl.on('line', (line) => {
    conn.write(line);

  }).on('close', () => console.log());

  conn.setEncoding('utf8');
  conn.on('connect', () => {
    console.log("Successfully connected to file server.");
    rl.prompt();
  });
  conn.on('data', (data) => {
    console.log("---------------");
    process.stdout.write(`${data}\n`);
    console.log("---------------");
    rl.prompt();
  });
  return conn;
};

connect();