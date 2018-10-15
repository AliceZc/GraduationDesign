<template>
	<div class="container">
		<div class="login">
			<div class="logo">登录</div>
			<form @submit.prevent="loginHandler">
			<div class="content">
				<label for="login_user">邮箱</label>
				<br>
				<input 	type="text" 
						name="" 
						id="login_user"
						v-model="formData.email"
						required
						autofocus 
				>
				<br>
				<label for="login_password">密码</label>
				<br>
				<input 	type="password" 
						name="" 
						id="login_password"
						v-model="formData.password"
						required 
				>
				<button type="submit" style="border: 0">登录</button>
			<p class="error_message" v-show="loginMessage">{{loginMessage}}</p>
			</div>
			</form>
			<hr>
			<div class="no_account">
			<a href="#/Zhuce">没有帐号? 
				<span style="color: red"> 免费注册 </span>
			</a>
			</div>
		</div>
	</div>
	
</template>

<script>
	import axios from 'axios'
	import _ from 'lodash'
	export default {
		data () {
			return {
				formData: {
					email: '',
					password: ''
				},
				loginMessage: ''
			}
		},
		methods: {
			loginHandler: _.debounce(async function () {
				try {
					const formData = this.formData
					const res = await axios.post('/api/session', formData)
					this.loginMessage = ''


					location.reload()
					this.$router.push('/')
				} catch (err) {
					const {status} = err.response
					switch(status) {
						case 404:
							this.loginMessage = '登录失败, 帐号或密码错误'
						break
					}
				}
			}, 500) 
		}
	}
</script>

<style scoped>
	hr {
		margin: 0px;
		margin-bottom: 10px;
	}
	.container {
		width: 100%;
		height: 578px;
		background-image: url('../../../images/bc/login.jpg');
		background-repeat: no-repeat;
		padding-top: 190px;
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
	.login form input {
		border-radius: 4px;
		height: 22PX;
		outline: none;
		border: 1px solid #CCC;
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
	.login .no_account {
		height: 28px;
		line-height: 30px;
		text-align: center;
	}
	.login .no_account a{
		color: #504A4A;
		text-decoration: none;
	}
</style> 