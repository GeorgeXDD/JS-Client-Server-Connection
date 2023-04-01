const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const serverHost = process.argv[2];
const serverPort = process.argv[3];

const client = net.createConnection({
  host: serverHost,
  port: serverPort
});

client.on('connect', () => {
  console.log('Connected to server');
  askForInput();
});

client.on('data', (data) => {
  console.log('Received response from server:', data.toString());
  askForInput();
});

client.on('end', () => {
  console.log('Disconnected from server');
});

function askForInput() {
  rl.question('Enter message to send to server (type "exit" to disconnect): ', (message) => {
    if (message === 'exit') {
      client.end();
    } else {
      client.write(message);
    }
  });
}