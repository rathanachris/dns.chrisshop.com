const https = require('https');
const fs = require('fs');
const app = require('./app'); // your express app

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/dns.chrisshop.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/dns.chrisshop.com/fullchain.pem')
};
https.createServer(options, app).listen(443, () => {
  console.log('HTTPS server return 301 https://$host$request_uri:443;running!');
});
