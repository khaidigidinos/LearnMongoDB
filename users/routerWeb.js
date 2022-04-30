const express = require('express')
const router = express.Router()
const fs=require('fs')
const { ObjectID } = require('mongodb')
const DB_NAME = 'learnmongodb'
const COLLECTION_NAME = 'users'

router.get('/create',(req, res)=>{
	res.status(200).send(fs.readFileSync('./users/create.html','utf-8'))
})
router.get('/:id',(req, res)=>{
	res.status(200).send(fs.readFileSync('./users/detail.html','utf-8'))
})
router.get('/:id/edit',(req, res)=>{
	res.status(200).send(fs.readFileSync('./users/edit.html','utf-8'))
})
router.get('/:id/delete',(req, res)=>{
	res.status(200).send(fs.readFileSync('./users/delete.html','utf-8'))
})

module.exports = router