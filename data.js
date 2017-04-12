const mongodb = require('mongodb');

const mongoUrl = "mongodb://localhost:27017/hello";

var connect = function (url, cb) {
   mongodb.connect(url, (err, db) => {
    cb(err, db);
  });
};

var update = function (name, cb) {
  connect(mongoUrl, (err, db) => {
    if(err) {
      return cb(err, null);
    }

    db.collection("people").update({num:1}, {name, num:1}, {upsert:true}, (err, doc) => {
      db.close();
      if (err) {
        return cb(err, null);
      }
      cb(null, doc);
    });
  });
};

var fetch = function (cb) {
  connect(mongoUrl, (err, db) => {
    if(err) {
      return cb(err, null);
    }

    db.collection("people").findOne({num:1}, (err, doc) => {
      db.close();
      if (err) {
        return cb(err, null);
      }
      cb(null, doc);
    });
  });
};

module.exports = {
  update,
  fetch
}
