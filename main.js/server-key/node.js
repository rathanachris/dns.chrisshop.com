const tls = require('node:tls');
const fs = require('node:fs');

// TLS options
const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),

  // Enable client certificate authentication if needed
  requestCert: true,
  rejectUnauthorized: false,   // ❗ Allow unauthorized but show warning (optional)

  // Provide CA if client uses self-signed cert
  ca: [ fs.readFileSync('client-cert.pem') ],
};

// Create TLS server
const server = tls.createServer(options, (socket) => {
  console.log("🔗 Client connected");

  if (socket.authorized) {
    console.log("✔ Client certificate authorized");
  } else {
    console.log("❌ Unauthorized client:", socket.authorizationError);
  }

  socket.setEncoding('utf8');

  socket.write("Welcome to TLS Server!\n");

  // Echo back data
  socket.on('data', (data) => {
    console.log("Client says:", data.trim());
    socket.write(`Echo: ${data}`);
  });

  socket.on('end', () => {
    console.log("🔌 Client disconnected");
  });

});

// Error handling
server.on('error', (err) => {
  console.error("Server error:", err);
});

server.listen(8000, () => {
  console.log("🚀 TLS server running on port 8000");
});
