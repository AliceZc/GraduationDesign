const db = require('../models/db')

exports.list = async (req, res, next) => {
	try {
			const sqlStr = `SELECT * FROM productions WHERE type='手办'`
			const sqlStr1 = `SELECT * FROM productions WHERE type='家居'`
			
			const sqlStr2 = `SELECT * FROM productions WHERE type='包包'`
			const sqlStr3 = `SELECT * FROM productions WHERE type='饰品'`
			const sqlStr4 = `SELECT * FROM productions WHERE type='钟表'`
			const sqlStr5 = `SELECT * FROM productions WHERE type='文体'`
	
			const shoubans	= await db.query(sqlStr)
			const jiajus	= await db.query(sqlStr1)
			const baobaos	= await db.query(sqlStr2)
			const shipins	= await db.query(sqlStr3)
			const zhongbiaos = await db.query(sqlStr4)
			const wentis	= await db.query(sqlStr5)
	
			res.status(200).json({
					shoubans,
					jiajus,
					baobaos,
					shipins,
					zhongbiaos,
					wentis
				})
	} catch (err) {
		next(err)
	}
}

exports.one = async (req, res, next) => {
	try {
		const {id} = req.params
		const sqlStr = `SELECT * FROM productions WHERE id=${id}`
		const data = await db.query(sqlStr)
		res.status(200).json(data[0])
	} catch (err) {
		next(err)
	}
}

exports.up = async (req, res, next) => {
	try {
		const body = req.body
		const sqlStr = `INSERT INTO productions(name, price, type, img_src)
			VALUES(
				'${body.name}',
				'${body.price}',
				'${body.type}',
				'${body.img_src}'
			)`
		const ret = await db.query(sqlStr)
		const [product] = await db.query(`SELECT * FROM productions WHERE id='${ret.insertId}'`)
		res.status(201).json(product)
	} catch(err) {
		next(err)
	}
}