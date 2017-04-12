const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const data = require('./data');

const port = 3000;

var app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
  res.render('index', {port});
});

app.get('/page2', (req, res) => {
  data.fetch((err, doc) => {
    if(err != null) {
      return res.status(500).send(err);
    }
    res.render('page2', {name: doc ? doc.name : 'Stranger'});
  });
});

app.post('/page2', (req, res) => {
  var name = req.body.name;
  data.update(name, (err, doc) => {
    if(err != null) {
      return res.status(500).send(err);
    }
    res.redirect("/page2");
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
