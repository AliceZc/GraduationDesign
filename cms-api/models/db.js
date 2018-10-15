const mysql = require('mysql')

// 创建一个连接池，效率更高，不需要每次操作数据库都创建连接
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'admin',
	database: 'myproject'
})

/**
 *  // query 方法
 *  // 查询返回数组
 *  // 增删改返回对象
 * @param  {[type]} sqlStr [description]
 * @return {[type]}        [description]
 */
exports.query = function (sqlStr) {
	return new Promise ((resolve, reject) => {
		//从连接池中拿出一个连接
		pool.getConnection((err, connection) => {
			if (err) {
				return reject(err)
			}
			connection.query(sqlStr, (err, ...args) => {
				//操作结束，尽早的释放连接
				connection.release()
				if (err) {
					return reject(err)
				}
				resolve(...args)
			})
		})
	})
}