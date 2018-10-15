<template>
	<div class="newsUp">
		<el-card shadow="always">
			<label>标题</label>
			<el-input v-model="form.title" placeholder="请输入内容" clearable></el-input>
			<br>
			<br>
			<label>内容</label>
			<el-input
  				type="textarea"
  				:rows="2"
  				placeholder="请输入内容"
  			v-model="form.content">
			</el-input>
			<br>
			<br>
			<el-button @click="formHandler">上传</el-button>
			<br>
			<br>
			<el-upload name="file"
				  style="border: 1px solid pink;width: 200px;height: 200px"
				  class="avatar-uploader"
				  :action="action"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
    	</el-card>
	</div>
</template>

<script>
	import $ from 'jquery'
	import axios from 'axios'
	export default {
		data () {
			return {
				form: {
					title: '',
					content: ''
				},
				id: 1,
				action: '',
				imageUrl: ''
			}
		},
		methods: {
			async formHandler () {
				console.log(this.form)
				const {data} = await axios.post('/api/newsUp', this.form)
				const id = data.id
				this.id = id
				this.action = '/api/newsImg/' + this.id 

			},
			async handleAvatarSuccess(res, file) {
        		this.imageUrl = URL.createObjectURL(file.raw);

        		const id = this.id
        		const imgSrc = res.replace(/\\/g, "\\\\")
        		const imgSrc1 = imgSrc.replace('static', '')
        		
        		const avatar = {avatar: imgSrc1}

        		await axios.patch(`/api/upImgSrc/${id}`, avatar)
        		
     		},
      		beforeAvatarUpload(file) {
       			const isJPG = file.type === 'image/jpeg';
        		const isLt2M = file.size / 1024 / 1024 < 2;

        		if (!isJPG) {
          			this.$message.error('上传头像图片只能是 JPG 格式!');
        		}
        		if (!isLt2M) {
          			this.$message.error('上传头像图片大小不能超过 2MB!');
        		}
        		return isJPG && isLt2M;
      		}
    	}
	}
</script>

<style scoped>
	.newsUp {
		padding: 40px;
	}
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
</style> 