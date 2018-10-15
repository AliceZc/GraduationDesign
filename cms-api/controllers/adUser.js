const md5 = require('blueimp-md5')
const moment = require('moment')
const db = require('../models/db.js')

exports.list = async (req, res, next) => {
	try {
		const {id} = req.params
		const sqlStr = `SELECT * FROM ad_user`
		const users = await db.query(sqlStr)
		res.status(200).json(users)
	} catch (err) {
		next(err)
	}
}