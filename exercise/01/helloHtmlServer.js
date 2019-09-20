const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

function hello(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body> AAAAAAAAAAAA </br> <a href="https://www.youtube.com">Youtube!</a> </body></html>');
}

const server = http.createServer(hello);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});