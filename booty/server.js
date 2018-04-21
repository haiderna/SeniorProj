//These are all express/mongodb functions to interact with database
//	run "npm run dev" to connect
//mlab.com
// 	u: cs306
// 	p: WillowTree6
// 	willowtree db user
// 		u:admin
// 		p:cs306

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

var mongoURL = 'mongodb://admin:cs306@ds113835.mlab.com:13835/willowtree' //URL for myLab mongodb instance
var collection = 'people' //people collection in mongodb

app.use(express.static(__dirname))

//connecting to myLab mongoDB instance
MongoClient.connect(mongoURL, (err, database) => {
	if(err) return console.log(err)
	db = database
	//db = client.db('willowtree')

	app.listen(process.env.PORT || 3000, () => {
		console.log('listening on 3000')
	})
	//client.close();
})

//*******POST*************
// app.post('/', (req, res) => {
// 	console.log('hi')
//   db.collection(collection).save(req.body, (err, result) => {
//     if (err) return console.log(err)

//     console.log('saved to database (people collection)')
	
//     res.redirect('/')//redirecting to base url
//   })
// })


//********GET************
app.get('/', (req,res) => {
	//res.send('HelloWorld') //testing
	console.log(__dirname);
	res.sendFile(__dirname +'/index.html');
})

// app.get('/',(req,res)=>{
// 	var cursor = db.collection('people').find().toArray(function(err,results){
// 		//all the stuff that will be sent to to array
// 		console.log(results) //for debugging


// 	})
// })