app.use((req, res, next) => {
  if (req.protocol ssl=== 'https://www') {
    res.redirect(301, `https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
});
