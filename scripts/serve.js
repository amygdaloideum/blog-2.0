const handler = require('serve-handler');
const http = require('http');
const { join } = require('path');

const PORT = process.env.PORT || 8080;
 
const server = http.createServer((request, response) => {
  return handler(request, response, { public: join(__dirname, '../public')});
})
 
server.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});