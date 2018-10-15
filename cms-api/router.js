const express = require('express')
const router = express.Router()
const db = require('./models/db.js')
const userController = require('./controllers/user')
const topicController = require('./controllers/topic')
const commentController = require('./controllers/comment')
const sessionController = require('./controllers/session')
const cartoonController = require('./controllers/cartoon')
const newsController = require('./controllers/news')
const shopController = require('./controllers/shop')
const orderController = require('./controllers/order')
const newsCommentController = require('./controllers/newsComment')
const shopCarController = require('./controllers/shopCar')
const animeExpoController = require('./controllers/animeExpo')
const uploadController = require('./controllers/upload')
const carItemController = require('./controllers/carItem')
const adSessionController = require('./controllers/adSession')
const adUserController = require('./controllers/adUser')
const multer = require('multer')


function checkLogin(req, res, next) {
	if (!req.session.user) {
		return res.status(401).json({
			error: 'Unauthorized'
		})
	}
	next()
}

// 检验资源是否存在以及是否有修改删除话题的权限
async function checkTopic(req, res, next) {
	try {
		const {id} = req.params
		const [topic] = await db.query(`SELECT * FROM topics WHERE id=${id}`)

		// 如果资源不存在
		if (!topic) {
			return res.status(404).json({
				error: 'Topic not Found.'
			})
		}

		// 如果话题不属于作者自己
		if (topic.user_id !== req.session.user.id) {
			return res.status(400).json({
				error: 'Action Invalid'
			})
		}
		next()
	} catch (err) {
		next(err)
	}
}

/**
 * 用户资源
 */

router
	.get('/api/users/', userController.list)
	.get('/api/users/:id', userController.one)
	.post('/api/users', userController.create)
	.patch('/api/users/:id', userController.update)
	.patch('/api/avatar/:id', userController.avatar)
	.delete('/api/user/:id', userController.destroy)
	.post('/api/appendUserInfo/:id', userController.appendInfo)
/**
 * 话题资源
 */

router
	.post('/api/findTopics', topicController.list)
	.get('/api/topic/:id', topicController.one)
	.post('/api/topics', checkLogin, topicController.create)
	.patch('/api/topics/:id', checkLogin, checkTopic, topicController.update)
	.delete('/api/topic/:id', checkLogin, checkTopic, topicController.destroy)
	.post('/api/topicCount', topicController.count)
	.get('/api/topics', topicController.all)

/**
 * 评论资源
 */

router
	.get('/api/comments', commentController.list)
	.post('/api/comments', checkLogin, commentController.create)
	.patch('/api/comments/:id', checkLogin, commentController.update)
	// .delete('/comments/:id', checkLogin, commentController.destroy)

/**
 * 会话管理
 */

router
	.get('/api/session', sessionController.get)
	.post('/api/session', sessionController.create)
 	.delete('/api/session', sessionController.destroy)

/**
 * 动画管理
 */
router
	.get('/api/cartoons', cartoonController.list)
	.get('/api/cartoon/:id', cartoonController.one)
	.get('/api/lateCartoon', cartoonController.late)
	.delete('/api/cartoon/:id', cartoonController.destroy)
	.post('/api/cartoonUp', cartoonController.up)

	
/**
 * 资讯管理
 */
router
	.get('/api/news', newsController.list)
	.get('/api/news/:id', newsController.one)
	.get('/api/addHits/:id', newsController.addHits)
	.delete('/api/news/:id', newsController.destroy)
	.post('/api/newsUp', newsController.upload)
	.post('/api/newsImg/:id', newsController.uploadImg)
	.patch('/api/upImgSrc/:id', newsController.uploadImgSrc)


/**
 *  商品管理
 */
router
	.get('/api/productions', shopController.list) // 列出所有商品
	.get('/api/production/:id', shopController.one) // 根据 id 列出商品
	.post('/api/productUp', shopController.up)
/**
 * 订单管理
 */
router
	.post('/api/order', checkLogin, orderController.create)
	.get('/api/order/:id', checkLogin, orderController.list) // 根据用户 id 列出 该用户的订单
	.delete('/api/order/:id', checkLogin, orderController.destroy)
	.post('/api/orderState/:id', orderController.changeState)
	.get('/api/order', orderController.all)

/**
 * 新闻评论
 */
router
	.get('/api/newsComment', newsCommentController.list)
	.post('/api/newsComment', checkLogin, newsCommentController.create)
	.patch('/api/newsComment/:id', checkLogin, newsCommentController.update)
	// .delete('/newsComment/:id', checkLogin, newsCommentController.destroy)

/**
 * 购物车管理
 */
router
	.get('/api/shopCar/:id', shopCarController.list) //id：用户的id 查询是否已存在该用户的购物车
	.post('/api/shopCar', shopCarController.create)  //创建购物车
	.patch('/api/shopCar/:id', shopCarController.update) // 更新购物车信息
	// .delete('/api/shopCar/:id', shopCarController.destroy) // 销毁购物车

/**
 * 漫展信息
 */
router
	.get('/api/animeExpo', animeExpoController.list)	// 获取所有漫展信息
	.get('/api/animeExpo/:id', animeExpoController.one) // 根据id 获取漫展详情

/**
 * 上传头像
 * @type {[type]}
 */
router
 	.post('/api/upload',  uploadController.upload)
 	.get('/api/session', sessionController.get)
	.post('/api/session', sessionController.create)
 	.delete('/api/session', sessionController.destroy)

/**
 * 购物车选项管理
 */
router
	.post('/api/carItem', carItemController.create)
	.get('/api/carItem/:id', carItemController.list)
	.delete('/api/carItem/:id', carItemController.destroy)
	.delete('/api/carItemAll/:id', carItemController.destroyAll)

/**
 * 追加地址电话姓名信息
 * 参数: id 为订单id
 */
router
	.post('/api/appendInfo/:id', orderController.appendInfo)

router
	.get('/api/adSession', adSessionController.get)
	.post('/api/adSession', adSessionController.create)
 	.delete('/api/adSession', adSessionController.destroy)

router
	.get('/api/adUser', adUserController.list)
module.exports = router
