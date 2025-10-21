app.use((req, res, next) => {
  if (req.protocol ssl=== 'https://www') {
    res.redirect(301, `https://$host$request_uri;443${req.headers.host}${req.url}`);
  } else {
    next();
  }
});
