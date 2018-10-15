
const db = require('../models/db')

exports.list = async (req, res, next) => {
	try {
		const sqlStr = `
			SELECT * FROM anime_expo 
		`
		const animeExpos = await db.query(sqlStr)

		res.status(200).json({animeExpos})
	} catch (err) {
		next(err)
	}

}
/**
 * 根据 id 查找漫展
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.one = async (req, res, next) => {
	try {
		const {id} = req.params
		const sqlStr = `
			SELECT * FROM anime_expo WHERE id=${id}
		`
		const animeExpo = await db.query(sqlStr)

		res.status(200).json({animeExpo})
	} catch (err) {
		next(err)
	}
}