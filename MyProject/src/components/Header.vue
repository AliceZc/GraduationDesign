<template>
	<div class="container">
		<nav>
			<ul class="c_left">
			<img :src="logo" width="150px;" style="vertical-align:bottom;border: none">
			<li><a href="#/">首页</a></li>
			<li><a href="#/AnimeExpo">漫展信息</a></li>
			<li><a href="#/Cartoon">番剧列表</a></li>
			<li><a href="#/News">番剧资讯</a></li>
			<li><a href="#/Shop">周边商城</a></li>
			<li><a href="#/Newforum">交流社区</a></li>
			</ul>
			<div class="c_right">
				<template v-if="isLogin">			
				<el-dropdown>
  				<span class="el-dropdown-link">
  					<img :src="user.avatar" class="face">
  					
    				<i class="el-icon-arrow-down el-icon--right"></i>
  				</span>
  					<el-dropdown-menu slot="dropdown">
    					<el-dropdown-item style="color: #2276CD">
    						当前用户：
    						<span style="font-size: 15px;color: cyan">
    							{{ nickname }}
    						</span>
    					</el-dropdown-item> 
    					<hr>  				
    					<!-- <div style="margin-bottom: 4px;">
    						<a href="#">找回密码</a>
    					</div>	 -->
    					
    					<a style="text-decoration:none;text-align: center"  href="#/Inforsetting">
    						<el-dropdown-item>
    							设置
    						</el-dropdown-item>
    					</a>			
    					<a style="text-decoration:none;text-align: center"  href="#/OrderDetail">
    						<el-dropdown-item>订单管理</el-dropdown-item>
    					</a>
    					
    					
    					<a style="text-decoration:none;text-align: center"  href="#/ShopCar">
    						<el-dropdown-item>购物车</el-dropdown-item>
    					</a>
    					
    					
    					<span @click.prevent="logoutHandler" style="text-align: center">
    						<el-dropdown-item>退出</el-dropdown-item>
    					</span>

  			 		</el-dropdown-menu>
				</el-dropdown>
				</template>
				<template v-else>
				<a href="#/Login"><button>登录</button></a>
				<a href="#/Zhuce"><button>注册</button></a>
				</template>
				<a href="#/AdLogin" style="color: cyan;vertical-align: bottom;padding: 20px">
					管理员入口
				</a>
			</div>
		</nav>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				isLogin: false,
				nickname: '',
				logo: require('../images/newlogo1.png'),
				user: {}
			}
		},
		created () {
			this.checkLogin()
		},
		methods: {
			async logoutHandler () {
				try {
					await axios.delete('/api/session')
					this.isLogin = false
					this.$router.push('/Login')
				} catch (err) {
					alert('退出失败')
				}
			},
			async checkLogin () {
				try {
					const {data: sessionUser } = await axios.get('/api/session')
						
					this.nickname = sessionUser.nickname
					this.isLogin = true
					let n = sessionUser.avatar
					n = n.replace(/\\/g, "/")
					n = n.replace("static", "")
					sessionUser.avatar = n
					this.user = sessionUser
					//问题在于需要重新登录才能修改账号头像

				} catch (err) {

				}
			}
		}
	}
</script>

<style scoped>
	.container {
		
	}
	nav {		
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 0px;
		background-color: rgba(0,0,0,0.5);
		box-shadow: 0 1px 2px rgba(0,0,0,.1);
		z-index: 10;
	}
	.c_left {
		display: inline-block;
		margin: 0px;
		padding: 0px;
		margin-left: 40px;
		list-style: none;
		margin-right: 100px;
		vertical-align: middle;
	}
	.c_left span {
		margin: 0 30px;
	}
	.c_left span i {
		font-size: 30px;
		vertical-align: middle;
	}
	.c_left li {
		display: inline-block;
		margin-left: 50px;
	}
	.c_left li a:hover {
		color: #ff6fa2;
	}
	.c_left li a {
		display: inline-block;
		line-height: 51px;
		text-decoration: none;
		color: #fff;
		font-weight: bold;
		padding: 0 6px;
	}
	.c_left li a:hover {
		background-color: hsla(0,0%,100%,.5);
	}
	.c_right {
		display: inline-block;
		margin-right: 40px;
	}
	.c_right i{
		vertical-align: bottom;
	}
	.c_right a{
		text-decoration: none;
		color: black;
	}
	.c_right .face{
		width: 38px;
		height: 38px;
		border-radius: 50%;
		vertical-align: middle;
	}
	.c_right button {
		padding: 10px 15px;
		border: 1px solid rgba(0,0,0,0.1);
		border-radius: 4px;
		background-color: #fff;
	}
</style> 
