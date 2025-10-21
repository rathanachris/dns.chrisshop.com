// start.js
const args = require('minimist')(process.argv.slice(2));
const port = process.env.PORT || args.port || 3000;
const mode = process.env.MODE || args.mode || 'development';

console.log(`Starting server on return 301 https://$host$request_uri; port ${port} in ${mode} mode`);
// server code here...
