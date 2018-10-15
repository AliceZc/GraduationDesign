const db = require('../models/db')
const multer = require('multer')
const fs = require('fs')
const muilter = require('../models/multerUtil')
const upload= muilter.single('file')
const moment = require('moment')

/**
 *  分页资讯列表
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
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

		const sqlStr = `
			SELECT * FROM news LIMIT ${start}, ${_limit}
		`
		const news = await db.query(sqlStr)

		// 获取总记录数
		const [{count}] = await db.query(`SELECT COUNT(*) as count FROM news`)


		res.status(200).json({
			news,
			count
		})
	} catch (err) {
		next(err)
	}

}
/**
 * 根据 id 查找资讯
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.one = async (req, res, next) => {
	try {
		const {id} = req.params
		const sqlStr = `SELECT * FROM news WHERE id=${id}`
		const news = await db.query(sqlStr)
		res.status(200).json(news[0])
	} catch (err) {
		next(err)
	}
}

exports.addHits = async (req, res, next) => {
	try {
		const {id} = req.params
		const sqlStr = `
		UPDATE news SET 
		hits = hits + 1
			WHERE id=${id}`
		await db.query(sqlStr)

		const [updatedNewsComment] = await db.query(`SELECT * FROM news WHERE id=${id}`)

		res.status(201).json(updatedNewsComment)
	} catch (err) {

	}
}
exports.destroy = async (req, res, next) => {
	try {
		console.log(req.params)
		const {id} = req.params
		
		// 执行删除操作
		const sqlStr = `
		DELETE FROM news WHERE id=${id}`
		await db.query(sqlStr)

		// 响应成功
		res.status(201).json({})	
	} catch (err) {
		next(err)
	}
}


exports.upload = async (req, res, next) => {
	try { 		
		const body = req.body
		const n = new Date()
		const time = n.toLocaleString()
		const sqlStr = `
			INSERT INTO news(title,content,time)
			VALUES('${body.title}',
				'${body.content}',
				'${time}'
				)`
		// 当进行增删改的时候，db.query 方法返回的是一个对象，所以我们这里可以使用结构赋值的方式来取值
		const {insertId} = await db.query(sqlStr)
		// 当执行查询操作的时候，返回的是数组，所以这里可以数组结构来取值
		const [news] = await db.query(`SELECT * FROM news WHERE id=${insertId}`)
		res.status(201).json(news)
	} catch(err) {
		next(err)
	}
}

exports.uploadImg = async (req, res, next) => {
	try { 	
     		upload(req, res, function (err) {
       			 //添加错误处理
    			if (err) {
         			return  console.log(err);
    			} 
        		//文件信息在req.file或者req.files中显示。
   		 		// console.log(req.file)
   		 		res.status(200).json(req.file.path)

 			})
			
	} catch(err) {
		next(err)
	}
}
exports.uploadImgSrc = async (req, res, next) => {
	const {id} = req.params
	const {avatar} = req.body
	const n = avatar.replace(/\\\\/g, "/")
	console.log(n)
		const sqlStr = `
		UPDATE news SET 
		img_src = '${n}'
			WHERE id=${id}`

		// 执行更新操作
		await db.query(sqlStr)

		const [updatedNews] = await db.query(`SELECT * FROM news WHERE id=${id}`)

		res.status(201).json(updatedNews)
}