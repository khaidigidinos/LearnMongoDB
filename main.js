const open = require('open')
const fs=require('fs')
const express=require('express')
const bodyParser = require('body-parser')
const app=express()
const port = 8080
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://khai29012001:khainguyenminh@cluster0.gqngo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
var connection = null

/* Middleware */
app.use(express.static('assets'))
app.use(bodyParser.json())

const users=require('./users/routerWeb')
const usersAPI=require('./users/routerAPI')

app.use('/users', async (req, res, next) => {
  // Inject
  req.connection = connection
  await next()
}, users)
app.use('/api/users', async (req, res, next) => {
  // Inject
  req.connection = connection
  await next()
}, usersAPI)

/* WEB routes */
app.get('/',(req, res)=>{
	res.status(200).send(fs.readFileSync('./users/index.html','utf-8'))
})

const server = app.listen(port,async() => {
  console.log(`Example app listening on port ${port}`)
  connection = await client.connect()
  await open(`http://localhost:${port}`)
})
