const express = require('express');
const bodyParser = require('body-parser');
const speakEasy = require('speakeasy');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/totp-secret', (req, res, next) => {
  const secret = speakEasy.generateSecret({length: 10});
  return res.send({secret: secret.base32});
});

app.post('/totp-generate', (req, res, next) => {
  return res.send({
    token: speakEasy.totp({
      secret: req.body.secret,
      encoding: 'base32',
    }),
    remaining: (30 - Math.floor((new Date().getTime() / 1000 % 30))),
  });
});

app.post('/totp-validate', (req, res, next) => {
  return res.send({
    valid: speakEasy.totp.verify({
      secret: req.body.secret,
      encoding: 'base32',
      token: req.body.token,
      window: 0,
    }),
  });
});

module.exports = app;
