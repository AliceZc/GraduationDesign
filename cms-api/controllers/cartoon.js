const db = require('../models/db')


exports.list = async (req, res, next) => {
	try {
		let {_page = 1, _limit = 20} = req.query

	    if (_page < 1) {
	    	_page = 1
	    }
	    if (_limit < 1) {
	    	_limit = 1
	    }
	    if (_limit > 20) {
	    	_limit = 20
	    }
    
	    const start = (_page - 1) * _limit

	    
	    const sqlStr = `SELECT * FROM cartoons LIMIT ${start}, ${_limit}`


		const cartoons =  await db.query(sqlStr)

		// 获取总记录数
		const [{count}] = await db.query(`SELECT COUNT(*) as count FROM cartoons`)


		res.status(200).json({
			cartoons,
			count
		})
	} catch (err) {
		next(err)
	}
}

exports.one = async (req, res, next) => {
	try {
		const {id} = req.params
		const sqlStr = `SELECT * FROM cartoons WHERE id=${id}`
		const topics = await db.query(sqlStr)
		res.status(200).json(topics[0])
	} catch (err) {
		next(err)
	}
}

exports.late = async (req, res, next) => {
	try {
		const sqlStr = `SELECT * FROM cartoons WHERE air_year='2018' ORDER BY air_month DESC`
		const lateCartoon = await db.query(sqlStr)
		res.status(200).json(lateCartoon)
	} catch(err) {

	}
}
exports.destroy = async (req, res, next) => {
	try {
		const { id } = req.params

		// 执行删除操作
		const sqlStr = `
		DELETE FROM cartoons WHERE id=${id}`
		await db.query(sqlStr)

		// 响应成功
		res.status(201).json({})	
	} catch (err) {
		next(err)
	}
}

exports.up = async (req, res, next) => {
	try {
		const body = req.body
		const sqlStr = `INSERT INTO cartoons(title, type, actors, summary, img_src, air_year, air_month, link, play_time)
			VALUES(
				'${body.title}',
				'${body.type}',
				'${body.actors}',
				'${body.summary}',
				'${body.img_src}',
				'${body.air_year}',
				'${body.air_month}',
				'${body.link}',
				'${body.play_time}'
			)`
		const ret = await db.query(sqlStr)
		const [cartoon] = await db.query(`SELECT * FROM cartoons WHERE id='${ret.insertId}'`)
		res.status(201).json(cartoon)
	} catch(err) {
		next(err)
	}
}