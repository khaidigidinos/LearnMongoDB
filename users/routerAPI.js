const express = require('express')
const router = express.Router()
const fs=require('fs')
const { ObjectID } = require('mongodb')
const DB_NAME = 'learnmongodb'
const COLLECTION_NAME = 'users'

/* API routes */
router.get('/', async (req,res)=>{
	try {
		const conn = req.connection
		await conn.db(DB_NAME).collection(COLLECTION_NAME).find().toArray((err,list) => {
			res.status(200).json(list)
		})
	} catch (err) {
		res.status(200).json({message: err.message, isError: true })
	}
})
router.post('/', async (req,res)=>{
	try {
		const conn = req.connection
		const user = await conn.db(DB_NAME).collection(COLLECTION_NAME).findOne({ 'email': req.body.email })

		if(user) {
			res.status(200).json({message:'A user with this email has been registered', isError: true })
			return
		}

		await conn.db(DB_NAME).collection(COLLECTION_NAME).insertOne(req.body)
		res.status(201).json(req.body)
	} catch (err) {
		res.status(200).json({message: err.message, isError: true })
	}
})
router.get('/:id',async (req,res)=>{
	try {
		const conn = req.connection
		const user = await conn.db(DB_NAME).collection(COLLECTION_NAME).findOne({ '_id': ObjectID(req.params.id) })
		if(user) {
			res.status(200).json(user)
		} else {
			res.status(200).json({message:'User does not exist or no longer exists', isError: true })
		}
	} catch (err) {
		res.status(200).json({message: err.message, isError: true })
	}
})
router.patch('/:id',async (req,res)=>{
	try {
		const conn = req.connection
		const count = await conn.db(DB_NAME).collection(COLLECTION_NAME).replaceOne({ '_id': ObjectID(req.params.id) }, req.body)

		if(count.modifiedCount == 1) {
			res.status(200).json({message:'User modified'})
		} else {
			res.status(200).json({message:'User does not exist or no longer exists', isError: true })
		}
	} catch (err) {
			res.status(200).json({message: err.message, isError: true })
	}
})
router.delete('/:id', async(req,res)=>{
	try {
		const conn = req.connection
		const count = await conn.db(DB_NAME).collection(COLLECTION_NAME).deleteOne({ '_id': ObjectID(req.params.id) })
		if(count.deletedCount == 1) {
			res.status(200).json({message:'User deleted'})
		} else {
			res.status(200).json({message:'User does not exist or no longer exists', isError: true })
		}
	} catch (err) {
		res.status(200).json({message: err.message, isError: true })
	}
})
module.exports = router