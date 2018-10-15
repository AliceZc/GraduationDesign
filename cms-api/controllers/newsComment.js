const db = require('../models/db')
const moment = require('moment')

exports.list = async (req, res, next) => {
	try {
		const {news_id} = req.query
		const sqlStr = `SELECT * FROM newscomments WHERE news_id=${news_id}`
		const newsComments = await db.query(sqlStr)
		res.status(200).json(newsComments)
	} catch(err) {
	  next(err)
	}
}

/**
 * 创建评论
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.create = async (req, res, next) => {
	try {
		// 获取表单数据
		// 操作数据库
		// 发送响应数据
		
		const {
			content = '',
			news_id,
		} = req.body
		const sqlStr = `
			INSERT INTO newscomments(content,news_id, user_id)
			VALUES('${content}',
				'${news_id}',
				'${req.session.user.id}')`
		// 当进行增删改的时候，db.query 方法返回的是一个对象，所以我们这里可以使用结构赋值的方式来取值
		const {insertId} = await db.query(sqlStr)
		// 当执行查询操作的时候，返回的是数组，所以这里可以数组结构来取值
		const [newsComment] = await db.query(`SELECT * FROM newscomments WHERE id=${insertId}`)
		res.status(201).json(newsComment)
	} catch (err) {
		next(err)
	}
}
exports.update = async (req, res, next) => {

}
exports.destroy = async (req, res, next) => {

}