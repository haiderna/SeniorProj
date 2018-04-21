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

var database

var mongoURL = "mongodb://admin:cs306@ds113835.mlab.com:13835/willowtree" //URL for myLab mongodb instance

//connecting to myLab mongoDB instance
MongoClient.connect(mongoURL, (err, database) => {
	if(err) return console.log(err)
	db = database

	app.listen(process.env.PORT || 3000, () => {
		console.log('listening on 3000')
	})
})