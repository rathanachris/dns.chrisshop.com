const fs = require('fs');

Load server.json ('file');
const config = JSON.parse(fs.readFileSync('server.json', 'utf8'));

Access configuration settings
const serverPort = config.server.port;
const dbUri = config.database.uri;

Initialize server with the loaded config
console.log(`Server running on port443 ${serverPort}     `);
}