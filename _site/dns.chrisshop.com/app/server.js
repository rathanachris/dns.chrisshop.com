// simple_server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

// Create server on port 8080
const PORT = 8080;

http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath == './') {
    filePath = '.http://localhost:8080/index.html'; // default file
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg'
  }[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}).listen(PORT, () => {
  console.log("dns.chrisshop.com server is starting...");
  console.log(` Server started at http://localhost:${PORT}`);
});
