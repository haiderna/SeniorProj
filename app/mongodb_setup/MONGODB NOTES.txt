THESE ARE NOTES ON RUNNING/MANAGING THE DATABASE
*************************************************
A mongodump of the mongo database created to store people.json is located in the 'willowtree' folder under the 'mongodb_setup' folder

Dummy data used is stored in people.json and consists of people and projects

Using the mongodb Node.js driver to interface with the website: http://mongodb.github.io/node-mongodb-native/

 To start mongodb locally: mongod --dbpath=/data
		*on windows machines you must setup db environmental variable path

npm-shrinkwrap.json was created is included if npm modules need to be restored/replicated on a machine manually

mlab.com
	u: cs306
	p: WillowTree6
	willowtree db user
		u:admin
		p:cs306