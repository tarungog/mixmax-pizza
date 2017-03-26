var express = require('express');
var bodyParser = require('body-parser');
var sync = require('synchronize');
var cors = require('cors');

var app = express();

var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

app.get('/resolver', cors(corsOptions), require('./api/resolver'));
app.get('/suggestions', cors(corsOptions), require('./api/suggestions'));


if (process.env.NODE_ENV === 'production') {
  app.listen(process.env.PORT || 5000);
} else {
  var pem = require('pem');
  var https = require('https');
  pem.createCertificate({ days: 1, selfSigned: true }, function(err, keys) {
    if (err) throw err;

    https.createServer({
      key: keys.serviceKey,
      cert: keys.certificate
    }, app).listen(process.env.PORT || 5000);
  });
}