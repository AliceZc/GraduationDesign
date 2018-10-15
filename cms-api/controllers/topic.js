const moment = require('moment')
const db = require('../models/db')

/**
 *  分页话题列表
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.list = async (req, res, next) => {
	try {
		const {name} = req.body
		// let {_page = 1, _limit = 20} = req.query

	 //    if (_page < 1) {
	 //    	_page = 1
	 //    }
	 //    if (_limit < 1) {
	 //    	_limit = 1
	 //    }
	 //    if (_limit > 20) {
	 //    	_limit = 20
	 //    }
    
	 //    const start = (_page - 1) * _limit

		// const sqlStr = `
		// 	SELECT * FROM topics LIMIT ${start}, ${_limit}
		// `
		const sqlStr = `
			SELECT * FROM topics WHERE module='${name}'
		`
		const topics = await db.query(sqlStr)

		// 获取总记录数
		const [{count}] = await db.query(`SELECT COUNT(*) as count FROM topics`)


		res.status(200).json({
			topics,
			count
		})
	} catch (err) {
		next(err)
	}

}

exports.all = async (req, res, next) => {
	try {
		const sqlStr = 'SELECT * FROM topics'
			
		const topics = await db.query(sqlStr)

		res.status(200).json({
			topics
		})
	} catch (err) {
		next(err)
	}

}
/**
 *  根据 ID 查找一个
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.one = async (req, res, next) => {
	try {
		const {id} = req.params
		const sqlStr = `SELECT * FROM topics WHERE id=${id}`
		const topics = await db.query(sqlStr)
		res.status(200).json(topics[0])
	} catch (err) {
		next(err)
	}
}

/**
 * 创建话题
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.create = async (req, res, next) => {
	try {
		const body = req.body
		body.create_time = moment().format('YYYY-MM-DD hh:mm:ss')
		body.modify_time = moment().format('YYYY-MM-DD hh:mm:ss')
		body.user_id = req.session.user.id

		const sqlStr = `
			INSERT INTO topics(title, content, user_id, create_time, modify_time,module)
			VALUES('${body.title}', '${body.content}', '${body.user_id}', '${body.create_time}', '${body.modify_time}','${body.module}')
		`
        const ret = await db.query(sqlStr)
        const [topic] = await db.query(`SELECT * FROM topics WHERE id=${ret.insertId}`)
        res.status(201).json(topic)
	} catch (err) {
		next(err)
	}
}

/**
 * 更新话题
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.update = async (req, res, next) => {
	try {
		const {id} = req.params
		const body = req.body
		const sqlStr = `
		UPDATE topics SET title='${body.title}', content='${body.content}', modify_time='${moment().format('YYYY-MM-DD hh:mm:ss')}',
		 module='${body.module}'
			WHERE id=${id}`

		// 执行更新操作
		await db.query(sqlStr)

		const [updatedTopic] = await db.query(`SELECT * FROM topics WHERE id=${id}`)

		res.status(201).json(updatedTopic)
	} catch (err) {
		next (err)
	}
}

/**
 * 删除话题
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.destroy = async (req, res, next) => {
	// 根据话题 id 查询得到话题中的存储的作者 id
	// 如果话题中的 user_id 等于当前用户的 id
	// 才可以执行删除操作
	// url 中的 :id 叫做动态路由参数 
	// 可以通过 req.params 来获取动态路由参数
	// 查询字符串： req.query
	// POST 请求体: req.body
	// 动态路由参数：req.params
	
	try {
		const { id } = req.params

		// 执行删除操作
		const sqlStr = `
		DELETE FROM topics WHERE id=${id}`
		await db.query(sqlStr)

		// 响应成功
		res.status(201).json({})	
	} catch (err) {
		next(err)
	}
}

/**
 * 计算某个版块的总帖子数
 */
exports.count = async (req, res, next) => {
	try {
		const {modules} = req.body

		const counts = []
		for(let i = 0; i < modules.length; i++) {
			const j = modules[i]
			const sqlStr = `
			SELECT COUNT (*) as count FROM topics
			WHERE module='${j}'`
			const [{count}] = await db.query(sqlStr)
			counts.push(count)
		}

		res.status(201).json(counts)
	} catch (err) {
		next (err)
	}
}