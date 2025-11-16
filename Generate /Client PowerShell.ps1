# Generate Client Certificate
Write-Host "Generating CLIENT certificate..."
openssl req -x509 -newkey rsa:2048 -nodes -sha256 `
  -subj "/CN=localhost" `
  -keyout client-key.pem `
  -out client-cert.pem

# Generate Server Certificate
Write-Host "Generating SERVER certificate..."
openssl req -x509 -newkey rsa:2048 -nodes -sha256 `
  -subj "/CN=localhost" `
  -keyout server-key.pem `
  -out server-cert.pem

Write-Host "Done! Certificates created:"
Write-Host " - client-key.pem"
Write-Host " - client-cert.pem"
Write-Host " - server-key.pem"
Write-Host " - server-cert.pem"
