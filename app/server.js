//These are all express/mongodb functions to interact with database
//	run "npm run dev" to connect
//mlab.com
// 	u: cs306
// 	p: WillowTree6
// 	willowtree db user
// 		u:admin
// 		p:cs306

//***VARIABLES AND FUNCTIONS********

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient
var db
var mongoURL = 'mongodb://admin:cs306@ds113835.mlab.com:13835/willowtree' //URL for myLab mongodb instance
//var collection = 'people' //people collection in mongodb
var dbCursor //where the mongodb cursor is pointing to (can be multiple documents/fields etc.)

app.use(express.static(__dirname)) //**loads everything statically (including server stuff)

//connecting to myLab mongoDB instance
function getConnection(cb){
	MongoClient.connect(mongoURL, (err, db) => {
		if(err) return console.log(err)

		const myDB = db.db('willowtree')
		var people = myDB.collection('people')

		app.listen(process.env.PORT || 3000, () => {
			console.log('listening on 3000')
			
			findDocuments(myDB, function(){
			})
			// var myCursor = myDB.collection('people').find({},{})
			// while(myCursor.hasNext()){
			// 	console.log(tojson(myCursor.next()))
			// }
		})

		cb(null,people)
	})
}

//returns all documents
var findDocuments = function(db,cb){
	db.collection('people').find({},{}).toArray(function(err,docs){
		//assert.equal(err,null)
		console.log("Found following records")
		console.log(docs)
		callback(docs)
	})
}

//gets all documents and returns cursor to allow for walking through documents
function readAll(collection,cb){
	collection.find({},cb)
}

//printing specific person
function printPerson(people){
	if(!people){
		console.log("Couldn't find the people collection")
	}
	console.log("Person: " + people)
}

//printing all people
function printPeople(people, cb){
	people.each(function(err, people){
		if(err)return cb(err);
		printPerson(people)
	})
}

//get people collection
function get_People(cb){
	//calling connection function to connect to db
	getConnection(function(err, collection){
		if(err) return cb(err);

		//making a people processing plant
		function processPeople(err, people){
			if(err) return cb(err)

			// people.each(function(err,people){
			// 	if(err) return cb(err)

			// 	//if (hero) {
			// 		printPerson(people)
			// 	//}else{
			// 		collection.db.close()
			// 		cb()
			// 	//}
			// })
		}

		readAll(collection, processPeople)
	})
}

//***************************************************

//calling connection function
getConnection(function(err) {  
     if (err) {
         console.log("error connecting!", err);
         process.exit(1);
     }
});



// get_People(function(err){
// 	if(err) {
// 		console.log("error when getting people",err)
// 		process.exit(1)
// 	}
// })

//displaying website
app.get('/', (req,res) => {
	console.log(__dirname);
	res.sendFile(__dirname +'/index.html'); //displaying index
})

// app.get('/',(req,res)=>{
// 	var cursor = db.collection('people').find().toArray(function(err,results){
// 		//all the stuff that will be sent to to array
// 		console.log(results) //for debugging


// 	})
// })

//*******POST*************
// app.post('/', (req, res) => {
// 	console.log('hi')
//   db.collection('people').save(req.body, (err, result) => {
//     if (err) return console.log(err)

//     console.log('saved to database (people collection)')
	
//     res.redirect('/')//redirecting to base url
//   })
// })


