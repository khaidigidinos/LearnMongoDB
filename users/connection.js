const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://khai29012001:khainguyenminh@cluster0.gqngo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri)
var connection = null

let interface = {
	start: async () => {
		connection = await client.connect()
	},
	connection: connection
}

module.exports = interface