<template>
	<div class="box">
		<div class="container">
		<el-tabs type="border-card" tab-position="left" style="height: 400px;width: 600px;border-radius: 4px 4px 0 0;
		background-color: rgba(255,255,255,.6);
		box-shadow: 0 0 4px rgba(0,0,0,0.3);">
  			<el-tab-pane style="margin-bottom: 100px;">
    			<span slot="label">修改密码</span>
    			<form @submit.prevent="changePassword">
					<label>当前密码</label>
					<input type="password" v-model="currentPassword" autofocus="" required @focus="changeColor($event)" @blur="changeColorTo($event)">
					<br>
					<label>重设密码</label>
					<input type="password" v-model="newPassword" required minlength="6" maxlength="18" @focus="changeColor($event)" @blur="changeColorTo($event)">
					<br>
					<label>确认密码</label>
					<input type="password" v-model="confirmPassword" required minlength="6" maxlength="18" @focus="changeColor($event)" @blur="changeColorTo($event)">
					<span v-show="isSame" class="span_1">两次密码输入不一致</span>
					<br>
					<br>
					<div><span v-show="isTrue" class="span_2">密码错误, 请稍候重试</span></div>
					<button type="submit" class="button">Submit</button>
				</form>
  			</el-tab-pane>
  			<el-tab-pane label="上传头像">	
  				<el-upload name="file"
				  class="avatar-uploader"
				  action="/api/upload"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>

 			</el-tab-pane>
  				<el-tab-pane label="默认信息">
  				<el-form ref="form" :model="form" label-width="80px">	
					<el-form-item label="姓名">
						<el-input v-model="form.name" style="width: 120px">
						</el-input>
					</el-form-item>
					<el-form-item label="电话">
						<el-input v-model="form.tel" style="width: 180px">
						</el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input v-model="form.add">
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit" style="padding: 10px;">
							修改
						</el-button>
					</el-form-item>
  				</el-form>
  			</el-tab-pane>
		</el-tabs>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
				isSame: false,
				isTrue: false,
       			imageUrl: '',
       			userId: 0,
       			form: {
       				name: '',
       				tel: '',
       				add: ''
       			}
			}
		},
		async created () {
			const {data: session} = await axios.get('/api/session')
			const user_id = session.id
			this.userId = user_id
			const {data: user} = await axios.get(`/api/users/${user_id}`)

			let n = user.avatar
			n = n.replace(/\\/g, "/")
			n = n.replace("static", "")
			user.avatar = n
			this.imageUrl = user.avatar
			console.log(user)
		},
		methods: {
			async changePassword () {
				try {
					if (this.newPassword !== this.confirmPassword) {
					this.isSame = true
					return
					}
					// 得到当前登录用户的 data 数据，里面包含 pasword 加密后的数据
					const {data: sessionUser} = await axios.get('/api/session')
					if (sessionUser.password !== md5(md5(this.currentPassword))) {
						window.alert('密码错误')
						return
					}
					const id = sessionUser.id
					const newPassword = this.confirmPassword
					const {data: newUser} = await axios.patch(`/api/users/${id}`, {
						newPassword
					})
					this.$router.push('/')
				} catch (err) {
					alert('修改失败, 请稍后重试')
				}
			},
			changeColor(e) {
				e.target.style = "border: 1px solid cyan"
			},
			changeColorTo(e) {
				e.target.style = "border: 1px solid #ccc"
			},
			async handleAvatarSuccess(res, file) {
        		this.imageUrl = URL.createObjectURL(file.raw);


        		const id = this.userId

        		const imgSrc = res.replace(/\\/g, "\\\\")
        		const imgSrc1 = imgSrc.replace("public", "img")
        		const avatar = {avatar: imgSrc1}

        		const {data: user} = await axios.patch(`/api/avatar/${id}`, avatar)
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
      		},
      		async submit() {
      			const id = this.userId
      			const form = this.form
      			const {data} = await axios.post(`/api/appendUserInfo/${id}`, form)
      			alert('修改成功')
      			this.form = {}
      		}
    	}
	}
</script>

<style scoped>
	.box {}
	.container {
		margin: 0 auto;
		padding: 40px 400px;
		background-image: url('../../../images/bc/login.jpg');
    	background-repeat: no-repeat;
    	height: 538px;
    	padding-top: 190px;
	}
	.container input {
		margin-top: 30px;
		height: 25px;
		border-radius: 5px;
		margin-left: 20px;
		outline: none;
		border: 1px solid #ccc;
	}
	.container button {
		margin-top: 10px;
		width: 60px;
		height: 40px;
		border-radius: 6px;
		outline: none;
	}
	.container button:hover {
		background-color: #409EFF;
	}
	.container .span_1 {
		color: red;
		margin-left: 10px;
		padding: 6px;
	}
	.container .span_2 {
		color: red;
	}
	.button {
		background-color: white;
		color: black;
		outline: none;
		font-weight: 500;
		border-radius: 6px;
		font-size: 14px;
		border: 1px solid #ccc;
	}
	.el-tabs__item {
		margin: 100px;
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
    width: 178px;
    height: 178px;
    display: block;
  }
</style> 