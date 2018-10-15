
const moment = require('moment')
const db = require('../models/db')

exports.create = async (req, res, next) => {
	try {
		const body = req.body
		const user_id = body.user_id
		const sqlStr = `INSERT INTO shopcar(
						item_count,selected_item_count,total_price,order_count,selected_order_count,user_id)
			VALUES(
			'0',
			'0',
			'0',
			'0',
			'0',
			'${user_id}'
			)`
		const ret = await db.query(sqlStr)
		const [shopCar] = await db.query(`SELECT * FROM shopcar WHERE id='${ret.insertId}'`)
		res.status(201).json(shopCar)
	} catch(err) {
		next(err)
	}
}

exports.list = async (req, res, next ) => {
	try {
		const {id} = req.params
		const sqlStr = `
		SELECT * FROM shopcar WHERE user_id=${id}`
		const shopCar = await db.query(sqlStr)
	
		res.status(200).json(shopCar)
	} catch (err) {
		next(err)
	}
}

exports.update = async (req, res, next) => {
	try {
		const {id} = req.params
		
		const item_count = await db.query
		(`SELECT count(*) FROM orders WHERE id=${id}`)

		// const sqlStr1 = `
		// UPDATE shopcar SET item_count = ,
		// selected_item_count = ,
		// total_price = ,
		// order_count = ,
		// selected_order_count =	
		// 	WHERE id=${id}`

		// // 执行更新操作
		// await db.query(sqlStr1)

		// const [updatedShopCar] = await db.query(`SELECT * FROM shopcar WHERE id=${id}`)

		// res.status(201).json(updatedShopCar)
	} catch(err) {
		next(err)
	}
}