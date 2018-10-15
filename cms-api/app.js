const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const session = require('express-session')
const multer = require('multer')

const app = new express()


app.use(express.static('static'));

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(express.static("public"));



// 配置使用 Session
app.use(session({
	secret: 'itcast',
	resave: false,
	saveUninitialized: false
}))

// 把路由应用到 app 中
app.use(router)

// 统一处理 500 错误
app.use((err, req, res, next) => {
	res.status(500).json({
		err: err.message
	})
}) 

app.listen(3000, () => {
	console.log('App is running at port 3000')
	console.log('please visit http://127.0.0.1:3000/')
})