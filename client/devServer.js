const express = require('express');
const http = require('http');
let app = express();

app.use('*', (req, res) => {
  console.log(`${req.method} ${req.originalUrl}`);
  console.log(req.headers.cookie);
  if (req.headers.Authorization) {
    req.headers.Authorization = req.headers.authorization;
  }
  var requ = http.request({
    host: '107.174.14.110',
    path: req.originalUrl,
    method: req.method,
    headers: req.headers
  }, (resp) => {
    var body = '';
    resp.on('data', function(d) {
      body += d;
    });

    resp.on('end', function () {
      console.log('\nBODY:\n' + body);
      res.set(resp.headers);
      return res.status(resp.statusCode).send({ body: body, cookie: resp.headers['set-cookie']});
    });
  });

  requ.on('error', function(err) {
    console.log(err);
    return res.status(err.statusCode).send(err);
  });

  requ.end();
});

app.listen(80, () => console.log('App proxying /api on port 80...'));

module.exports = app;