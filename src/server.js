const http = require('http');
const app = require('./app');

const server = new http.Server(app);

server.listen(process.env.SEVER_PORT || 3333, () => {
  console.log('Server Started!');
});

module.exports = server;
