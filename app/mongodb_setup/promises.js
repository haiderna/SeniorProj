// db1.js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
                       
module.exports = {
  FindinCol1: function() {
    return MongoClient.connect(url).then(function(db) {
      var collection = db.collection('people');
      
      return collection.find().toArray();
    }).then(function(items) {
      console.log(items);
      return items;
    });
  }
};


// app.js
var db = require(url);
    
db.FindinCol1().then(function(items) {
  console.info('The promise was fulfilled with items!', items);
}, function(err) {
  console.error('The promise was rejected', err, err.stack);
});