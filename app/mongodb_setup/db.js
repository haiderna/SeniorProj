//mongodb functions specific for willowtree database (for more infor look in mongodbnotes.txt)

var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/";

var userInput = "";
//var array;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("willowtree");
  var query = { name: userInput};
  // dbo.collection("people").find().toArray(function(err, result) {
  //   if (err) throw err;
  //   //console.log(result);
  //   //array = result;
  //   //return result;
  //  // db.close();
  //   //console.log(result);
  // }));
  //return result

// console.log(array);
  var result;
  dbo.collection("people").find().toArray(result);
  console.log(result);
 db.close();
});

//console.log(result);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("willowtree");
  var query = { name: userInput};
  dbo.collection("people").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
//     db.close();
//   });
// });