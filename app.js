const http = require('http');

const router = require('./routes')
console.log(router.text)
const server = http.createServer(router.handler)
server.listen(3000);