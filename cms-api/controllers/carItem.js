const md5 = require('blueimp-md5')
const moment = require('moment')
const db = require('../models/db.js')

/**
 * 订单创建
 */
exports.create = async (req, res, next) => {
	try {
		const body = req.body

		const sqlStr =
			`INSERT INTO caritem(
			state,
			item_id,
			item_img,
			item_name,
			total_count,
			item_price,
			settlement_price,
			user_id,
			shopping_car_id,
			is_selected,
			order_type
			) 
			VALUES(
			'${body.state}',
			'${body.item_id}',
			'${body.item_img}',
			'${body.item_name}',
			'${body.total_count}',
			'${body.item_price}',
			'${body.settlement_price}',
			'${body.user_id}',
			'${body.shopping_car_id}',
			'${body.is_selected}',
			'${body.order_type}'
			)`
		const ret = await db.query(sqlStr)

		const [carItem] = await db.query(`SELECT * FROM caritem WHERE id = ${ret.insertId}`)
		res.status(201).json(carItem)
	} catch (err) {
		next(err)
	}
}

/**
 * 根据 user_id 查找该用户的 carItems
 * 
 */
exports.list = async (req, res, next) => {
	try {
		const {id} = req.params 

		const sqlStr = `SELECT * FROM caritem WHERE user_id = ${id}`
		const ret = await db.query(sqlStr)
		res.status(201).json(ret)
	} catch(err) {
		next(err)
	}
}

/**
 *
 * 根据 id 删除 carItem
 */
exports.destroy = async (req, res, next) => {
	try {
		const { id } = req.params
		// 执行删除操作
		const sqlStr = `
		DELETE FROM caritem WHERE id=${id}`
		await db.query(sqlStr)

		// 响应成功
		res.status(201).json({})
	} catch (err) {
		next(err)
	}
}

/**
 * 根据 用户 id 删除所有购物车中的 caritem
 *
 */
exports.destroyAll = async (req, res, next) => {
	try {
		const { id } = req.params
		// 执行删除操作
		const sqlStr = `
		DELETE FROM caritem WHERE user_id=${id} AND order_type = 0`
		await db.query(sqlStr)

		// 响应成功
		res.status(201).json({})
	} catch (err) {
		next(err)
	}
}