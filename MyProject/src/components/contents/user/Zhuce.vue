<template>
	<div class="container">
		<div class="login">
			<div class="logo">注册</div>
			<form @submit.prevent="register">
			<div class="content">
				<div class="part">
					<label for="login_user">邮箱</label>
					<input  type="email"  
						id="login_user" 
						required 
						autofocus 
						v-model="formData.email"
						@focus="changeColor($event)"
						@blur="queryHandler($event)"
					>
				</div>
				<div class="part">
					<label for="login_nickname">昵称</label>
					<input  type="text" 
							id="login_nickname"
							required
							minlength="2" 
							maxlength="9" 
							v-model="formData.nickname"
							@blur="queryNickHandler($event)"
							@focus="changeColor($event)"
					>
				</div>			
				<div class="part">
					<label for="login_password">密码</label>
					<input  type="password" 
							id="login_password"
							required
							minlength="6" 
							maxlength="18" 
							v-model="formData.password"
							@focus="changeColor($event)"
							@blur="changeColorTo($event)"
					>
				</div>	
				<button type="submit" style="border: 0">注册</button>
			</div>
			</form>
			<hr>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				formData: {
					email: '',
					password: '',
					nickname: ''
				},
				loginImg: require('../../../images/login.jpg')
			}
		},
		methods: {
			changeColorTo (e) {
				e.target.style = "border-bottom: 1px solid #ccc"
			},
			async queryHandler (e) {
				console.log(this.formData.email)
				const {data: users} = await axios.get('/api/users')
				for (var i = 0; i < users.length; i++) {
					if (users[i].email === this.formData.email) {
						alert('邮箱已存在!')
						this.formData.email = ''
					}
				}
				e.target.style = "border-bottom: 1px solid #ccc"
			},
			async queryNickHandler (e) {
				console.log(this.formData.nickname)
				const {data: users} = await axios.get('/api/users')
				for (var i = 0; i < users.length; i++) {
					if (users[i].nickname === this.formData.nickname) {
						alert('昵称已存在!')
						this.formData.nickname = ''
					}
				}
				e.target.style = "border-bottom: 1px solid #ccc"
			},
			async register () {
				const {data} = await axios.post('/api/users', this.formData)

				const user_id = data.id
				const date = {
      				user_id: user_id
      			}
				// 注册一个专属于该用户的购物车
				
				const {data: shopCar} = await axios.post('/api/shopCar',date)

				this.$router.push('/Login')
			},
			changeColor (e) {
				e.target.style = "border-bottom: 1px solid cyan"
			}
		}
	}
</script>

<style scoped>
	.container {
		background-image: url('../../../images/bc/login.jpg');
		background-repeat: no-repeat;
		height: 578px;
		padding-top: 190px;
	}
	hr {
		margin: 0px;
		margin-bottom: 10px;
	}
	.login {
		width: 500px;
		margin: 0 auto;
		border: 1px solid #878787;

		border-radius: 4px 4px 0 0;
		background-color: rgba(255,255,255,.6);
		box-shadow: 0 0 4px rgba(0,0,0,0.3);

	}
	.login .logo {
		background-color: #242424;
		height: 40px;
		color: #fff;
		font-size: 18px;
		font-weight: bold;
		line-height: 40px;
		padding-left: 40px;
	}
	.login form {
		padding: 30px 140px;
	}
	.login .part {
		margin-bottom: 20px;
	}
	.login form input {
		height: 22px;
		border: 0;
		border-bottom: 1px solid #ccc;
		outline: 0;
	}
	.login form button {
		margin-top: 38px;
		width: 173px;
		font-weight: bold;
		background-color: #2d78f4;
		color: #fff;
		height: 30px;
		border-radius: 6px;
	}
</style> 