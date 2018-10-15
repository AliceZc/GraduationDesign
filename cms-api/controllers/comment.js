const db = require('../models/db')
const moment = require('moment')

exports.list = async (req, res, next) => {
	try {
		const {topic_id} = req.query
		const sqlStr = `SELECT * FROM comments WHERE topic_id=${topic_id}`
		const comments = await db.query(sqlStr)
		res.status(200).json(comments)
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
			topic_id,
		} = req.body
		const sqlStr = `
			INSERT INTO comments(content, create_time, modify_time, topic_id, user_id)
			VALUES('${content}',
				'${moment().format('YYYY-MM-DD hh:mm:ss')}',
				'${moment().format('YYYY-MM-DD hh:mm:ss')}',
				'${topic_id}',
				'${req.session.user.id}')`
		// 当进行增删改的时候，db.query 方法返回的是一个对象，所以我们这里可以使用结构赋值的方式来取值
		const {insertId} = await db.query(sqlStr)
		// 当执行查询操作的时候，返回的是数组，所以这里可以数组结构来取值
		const [comment] = await db.query(`SELECT * FROM comments WHERE id=${insertId}`)
		res.status(201).json(comment)
	} catch (err) {
		next(err)
	}
}
exports.update = async (req, res, next) => {

}
exports.destroy = async (req, res, next) => {

}