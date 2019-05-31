const handler = require('serve-handler');
const http = require('http');
const { join } = require('path');
 
const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(request, response, { public: join(__dirname, '../public')});
})
 
server.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});