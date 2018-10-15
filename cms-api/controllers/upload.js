const db = require('../models/db')
const multer = require('multer')
const fs = require('fs')
const muilter = require('../models/multerUtil')
const upload= muilter.single('file')

exports.upload = async (req, res, next) => {
	try { 	
     		upload(req, res, function (err) {
       			 //添加错误处理
    			if (err) {
         			return  console.log(err);
    			} 
        		//文件信息在req.file或者req.files中显示。
   		 		console.log(req.file)
   		 		res.status(200).json(req.file.path)
 			})
			
	} catch(err) {
		next(err)
	}
}