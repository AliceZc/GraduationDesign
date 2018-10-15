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
			`INSERT INTO user_order(user_id,state,total_price,item_total_price,
			ship_fee,sub_order_count,address,user_name,user_tel
			)
			VALUES(
			'${body.user_id}',
			'${body.state}',
			'${body.total_price}',
			'${body.item_total_price}',
			'${body.ship_fee}',
			'${body.sub_order_count}',
			'${body.address}',
			'${body.user_name}',
			'${body.user_tel}'
			)`

		const ret = await db.query(sqlStr)
		const [order] = await db.query(`SELECT * FROM user_order WHERE id='${ret.insertId}'`)
		res.status(201).json(order)
	} catch (err) {
		next(err)
	}
}

/**
 * 订单查找 根据 用户 id
 */
exports.list = async (req, res, next) => {
	try {
		const {id} = req.params
		const sqlStr = `SELECT * FROM user_order WHERE user_id=${id}`
		const data = await db.query(sqlStr)
		res.status(200).json(data)
	} catch (err) {
		next(err)
	}
}

/**
 * 订单删除
 */
exports.destroy = async (req, res, next) => {
	try {
		const { id } = req.params

		// 执行删除操作
		const sqlStr = `
		DELETE FROM user_order WHERE id=${id}`
		await db.query(sqlStr)

		// 响应成功
		res.status(201).json({})
	} catch (err) {
		next(err)
	}
}