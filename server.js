const net = require('net');

let clients = [];

const server = net.createServer((client) => {
  client.id = clients.length + 1;
  clients.push(client);
  
  console.log(`Client ${client.id} connected from ${client.remoteAddress}:${client.remotePort}`);

  client.on('data', (data) => {
    console.log(`Received message from Client ${client.id}: ${data.toString()}`);
    client.write(`Server received your message: "${data.toString()}"`);
  });

  client.on('end', () => {
    console.log(`Client ${client.id} disconnected`);
  });
});

server.listen(8080, () => {
  console.log('Server started and listening on port 8080');
});