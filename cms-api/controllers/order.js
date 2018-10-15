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
			`INSERT INTO order_item(
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

		const [order] = await db.query(`SELECT * FROM order_item WHERE id = ${ret.insertId}`)
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
		console.log(id)
		const sqlStr = `SELECT * FROM order_item WHERE user_id = ${id}`
		const data = await db.query(sqlStr)
		res.status(200).json(data)
	} catch (err) {
		next(err)
	}
}

exports.all = async (req, res, next) => {
	try {
		const sqlStr = `SELECT * FROM order_item`
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
		console.log(id)
		// 执行删除操作
		const sqlStr = `
		DELETE FROM order_item WHERE id=${id}`
		await db.query(sqlStr)

		// 响应成功
		res.status(201).json({})
	} catch (err) {
		next(err)
	}
}

/**
 * 追加地址电话信息
 */
exports.appendInfo = async (req, res, next) => {
	try {
		const {id} = req.params // 订单id
		const body = req.body
		const sqlStr = `
		UPDATE order_item SET confignee_name='${body.consignee_name}',confignee_tel='${body.consignee_tel}',confignee_address='${body.consignee_address}'
			WHERE id=${id}`

		const data = await db.query(sqlStr)
		res.status(200).json(data)
	} catch(err) {
		next(err)
	}
}

/**
 * 修改订单状态
 * url /api/orderState/:id 
 */
exports.changeState = async (req, res, next) => {
	try {
		const {id} = req.params
		const body = req.body
		const sqlStr = 
			`UPDATE order_item SET state='${body.state}'
			WHERE id = ${id}`
		await db.query(sqlStr)

		const [updatedOrder] = await db.query(`SELECT * FROM order_item WHERE id=${id}`)

		res.status(201).json(updatedOrder)
	} catch(err) {
		next(err)
	}
}

