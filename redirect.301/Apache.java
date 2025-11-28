RewriteEngine On
RewriteCond %{THE_REQUEST} \s/+dns\.chrisshop\.com\./
RewriteRule ^dns\.chrisshop\.com\./$ /dns.chrisshop.com/ [R=301,L]
