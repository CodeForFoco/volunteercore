const express = require('express');
const axios = require('axios');
let app = express();

const baseUrl = 'http://107.174.14.110';

const handleProxy = function (req, res) {
  console.log(`${req.method} ${baseUrl}${req.originalUrl}`);
  switch(req.method) {
    case 'GET':
      axios.get(`${baseUrl}${req.originalUrl}`)
        .then(resp => {
          return res.json(resp.data);
        })
        .catch(err => {
          return res.status(500).send(err);
        });
      break;
    case 'POST':
      axios.post(`${baseUrl}${req.originalUrl}`)
        .then(resp => {
          return res.json(resp.data);
        })
        .catch(err => {
          console.log(err);
          return res.sendStatus(500);
        })
      break;
    default:
    break;
  }
}

app.use('*', handleProxy);

app.listen(80, () => console.log('App proxying /api on port 80...'));

module.exports = app;