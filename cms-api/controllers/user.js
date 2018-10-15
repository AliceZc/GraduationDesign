const md5 = require('blueimp-md5')
const moment = require('moment')
const db = require('../models/db.js')

exports.list = async (req, res, next) => {
	try {
		const {id} = req.params
		const sqlStr = `SELECT * FROM users`
		const users = await db.query(sqlStr)
		res.status(200).json(users)
	} catch (err) {
		next(err)
	}
}
exports.one = async (req, res, next) => {
	try {
		const {id} = req.params
		const sqlStr = `SELECT * FROM users WHERE id=${id}`
		const users = await db.query(sqlStr)
		res.status(200).json(users[0])
	} catch (err) {
		next(err)
	}
}
exports.create = async (req, res, next) => {
	try {
		const body = req.body
		const sqlStr =
			`INSERT INTO users(username, password, email, nickname, avatar, gender, create_time, modify_time)
			VALUES(
			'${body.email}',
			'${md5(md5(body.password))}',
			'${body.email}',
			'${body.nickname}',
			'/img/noface.gif',
			0,
			'${moment().format('YYYY-MM-DD hh:mm:ss')}',
			'${moment().format('YYYY-MM-DD hh:mm:ss')}'
			)`

		const ret = await db.query(sqlStr)
		const [user] = await db.query(`SELECT * FROM users WHERE id='${ret.insertId}'`)
		res.status(201).json(user)
	} catch (err) {
		next(err)
	}
}

exports.update = async (req, res, next) => {
	try {
		const {id} = req.params
		console.log(req.body)
		const {newPassword} = req.body
		const sqlStr = `
		UPDATE users SET 
		password='${md5(md5(newPassword))}', modify_time='${moment().format('YYYY-MM-DD hh:mm:ss')}'
			WHERE id=${id}`

		// 执行更新操作
		await db.query(sqlStr)

		const [updatedUser] = await db.query(`SELECT * FROM users WHERE id=${id}`)

		res.status(201).json(updatedUser)
	} catch (err) {
		next(err)
	}
}
exports.destroy = async (req, res, next) => {
	try {
		const { id } = req.params

		// 执行删除操作
		const sqlStr = `
		DELETE FROM users WHERE id=${id}`
		await db.query(sqlStr)

		// 响应成功
		res.status(201).json({})	
	} catch (err) {
		next(err)
	}
}
exports.avatar = async (req, res, next) => {
	const {id} = req.params
	const {avatar} = req.body
	
	console.log(avatar)
		const sqlStr = `
		UPDATE users SET 
		avatar = '${avatar}'
			WHERE id=${id}`

		// 执行更新操作
		await db.query(sqlStr)

		const [updatedUser] = await db.query(`SELECT * FROM users WHERE id=${id}`)

		res.status(201).json(updatedUser)
}
exports.appendInfo = async (req, res, next) => {
	try {
		const body = req.body
		const {id} = req.params
		const sqlStr = `UPDATE users SET 
		name ='${body.name}',tel = '${body.tel}', address = '${body.add}' 
			WHERE id=${id}`
		await db.query(sqlStr)

		const [updatedUser] = await db.query(`SELECT * FROM users WHERE id=${id}`)

		res.status(201).json(updatedUser)
	} catch(err) {
		next(err)
	}
}