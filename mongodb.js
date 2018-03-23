//**************VARIABLES AND FUNCTIONS***************
//	this section includes vars and functions to query, add, update etc. the DB

var MongoClient = require('mongodb').MongoClient, assert = require('assert');

//Connection URL
var url = 'mongodb://localhost:27017/myproject';

//function var to insert some stuff
var insertDocuments = function(db, callback) {
	//Get documents collection
	var collection = db.collection('documents');
	//Insert 3 documents to documents collection
	collection.insertMany([
	{a:1},{a:2},{a:3}
	], function(err, result){ //result is the result doc from MongoDB
		assert.equal(err,null);
		assert.equal(3,result.result.n);
		assert.equal(3,result.ops.length); //ops contains documents inserted w/added _id fields
		console.log("Inserted 3 documents into the collection");
		callback(result); //resulting doc from mongoDB
	});
}

//function var that queries and returns all documents in the documents collection (can be filtered to find some documents)
var findDocuments = function(db, callback){
	//get documents collection
	var collection = db.collection('documents');
	//find some documents and put them in an array
	collection.find({}).toArray(function(err,docs){ //function either errs or produces variable docs
		assert.equal(err,null);
		console.log("Found the following documents");
		console.log(docs)//output docs
		callback(docs);
	});
}

//find documents w/a query filter
var findSpecifiedDocuments = function(db,callback){
	//get documents collection
	var collection = db.collection('documents');
	//find the documents that meet the query criteria
	collection.find({'a':3}).toArray(function(err,docs){
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(docs);
		callback(docs);
	});
}

//update a document in documents collection
//		updates first document where field a is equal to 2 by adding new field b to document set to 1
var updateDocument = function(db,callback){
	var collection = db.collection('documents');
	//update document where a is 2, set b equal to 1
	collection.updateOne({a:2},{$set: {b:1}}, function(err,result){
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Updated the document with the field a equal to 2");
		callback(result);
	});
}

//remove a document
//		removing document where field a is equal to 3
var removeDocument = function(db,callback){
	//get documents collection
	var collection = db.collection('documents');
	
	//delete the document where a is 3
	collection.deleteOne({}, function(err,result){
		assert.equal(err,null);
		assert.equal(1, result.result.n);
		console.log("Removed the document with the field a equal to 3");
		callback(result);
	});
}

//Index a collection
//		creates an index on a field in documents collection
var indexCollection = function(db, callback) {
	db.collection('documents').createIndex(
	{"a":1},
		null,
		function(err, results){
			console.log(results);
			callback();
		}
	);
}


//***********CONNECT TO MONGODB****************
//	actually get some connections going to get stuff done

//Use connect method to connect to the server
MongoClient.connect(url, function(err,db) {
	//test connection
	assert.equal(null, err);
	console.log("Connected successfully to server");
		
	//calling the function to insert stuff
	insertDocuments(db, function() {
		
		//calling the find documents function to find the stuff we just inserted
		findDocuments(db, function(){//finds ALL documents
			//db.close();
		});
		
		//calling update documents function to update documents
		updateDocument(db, function(){
			db.close();
		});
		
		//calling the find documents function to find the stuff we just updated
		findDocuments(db, function(){//finds ALL documents
			// db.close();
		});
		
		//delete document where a field is 3
		removeDocument(db,function() {
			//db.close();
		});
		
		//calling the find documents function to see the thing we just delted
		findDocuments(db, function(){//finds ALL documents
			// db.close();
		});
		
		indexCollection(db,function() {
			//db.close();
		});
		
		//final visual check for sanity
		findDocuments(db, function(){//finds ALL documents
			// db.close();
		});
		
		// db.close();//exit db after insert done
	});
	
	
	//exit the db if insert documents doesn't happen?
	//db.close();
});