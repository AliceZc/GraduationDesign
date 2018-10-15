<template>
<div class="topicDetail">
	<el-card shadow="always" style="
		box-shadow: 0 0 4px rgba(0,0,0,0.3);width: 1000px;margin: 0 auto;margin-bottom: 60px;">
	<div class="container">		
			<h3 style="color: cyan;"> {{ topic.title }}</h3>
			<p style="color: #999">发布于 <b style="color: blue">{{ time }}</b> 作者 <b style="color: blue">{{ topicUserName }}</b></p>
			<p v-if="isLoginUser">
				<router-link :to="{name: 'topic-edit', params: {id: topic.id}}">
					<i class="el-icon-edit">编辑</i>
				</router-link>
				<a href="#" @click.prevent="removeTopicById(topic.id)"><i class="el-icon-delete">删除</i></a>
			</p>
			<hr>
			<br>
			<article style="margin-bottom: 60px;">{{ topic.content }}</article>
			<hr style="margin: 120px 0;margin-top: 200px;">
		<div class="comments">
			<div style="border:1px solid #dedede;box-shadow: 0 0 7px rgba(3,3,3,.25);background-color: #fff">
				<p style="border-left: 8px solid #ff5079;margin: 0;padding: 10px;font-size: 16px;padding-left: 60px;">评论</p>
			</div>
			<form @submit.prevent="createCommentHandler">
				<!-- <label>添加回复</label> -->
				<textarea v-model.trim="commentContent" cols="60" rows="4"	style="color: #777;" required minlength="20" autofocus>
						
				</textarea>
				<button type="submit">发表评论</button>		
			</form>
		</div>
			<ul v-for="item in comments" class="comment">					<li style="position: relative;list-style:none">
						<img :src="item.user.avatar" width="50" height="50" style="border-radius: 25px;position: absolute;top: 20px;left: 20px;">
						<div style="display: inline-block;margin-left: 100px;">
							<div class="commentInfo" style="color: #99a2aa;font-size: 12px;">
								<p style="color:#333;font-size:14px;font-weight:700">
								{{ item.user.nickname }}
								</p>
								<p style="font-size: 12px;">{{item.create_time}}</p>
								
							</div>
							<div class="commentContent">
								{{ item.content }}
							</div>
						</div>
				</li>		
			</ul>
	</div>
	</el-card>
</div>	
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				topic: {
					title: '',
					content: ''
				},
				commentContent: '',
				isLoginUser: false,
				comments: [],
				totalCount: 0,
				topicUserName: '',
				time: ''
			}
		},
		// 编辑和删除默认是不显示的，只有话题属于当前登录用户才显示
		async created () {
			try {
				// 根据 id 获取话题详情
				const {id} = this.$route.params
				const {data: topic} = await axios.get(`/api/topic/${id}`)
				this.topic = topic
				const {data: topicUser} = await axios.get(`/api/users/${this.topic.user_id}`)
				this.topicUserName = topicUser.nickname

				var date2 = new Date(this.topic.create_time)
				
				
				this.time = date2.toLocaleDateString()
				// 根据 话题 id 加载所有评论
				this.loadComments(topic.id)

				// 获取会话信息，处理： 编辑，删除 连接的显示和隐藏
				const {data: sessionUser} = await axios.get('/api/session')
				this.isLoginUser = topic.user_id === sessionUser.id
			} catch (err) {

			}
		},
		methods: {
			async removeTopicById(id) {
				if (!window.confirm('Are you sure?')) {
					return
				}
				try {
					await axios.delete(`/api/topic/${id}`)
					this.$router.push('/NewForum')
				} catch (err) {

				}
			},
			async createCommentHandler () {
				try {
					await axios.get('/api/session')
					// 先校验是否已登录，没有登录则提示去登录
					const {data} = await axios.post('/api/comments', {
						topic_id: this.topic.id,
						content: this.commentContent
					})
					this.comments.push(data)
					this.commentContent=''
				} catch (err) {
					const {status} = err.response
					switch(status) {
						case 401:
							if(!window.confirm('请登录')) {
								return
							}
							this.$router.push('/Login')
							break
					}
				}
				const id = this.topic.id
				const {data: comments} = await axios.get(`/api/comments?topic_id=${id}`)
				for (let i = 0; i < comments.length; i++) {
					 const user_id = comments[i].user_id
				     const {data: user} = await axios.get(`/api/users/${user_id}`)     
				     const n = user.avatar
				     const m = n.replace(/\\/g, "/")
				     const path = m.replace('static', '').trim()
				     user.avatar = path
				     comments[i].user = user
				}
				this.comments = comments
			},
			async loadComments(topicId) {
				const {data} = await axios.get(`/api/comments?topic_id=${topicId}`)
				for (let i = 0; i < data.length; i++) {
					 const user_id = data[i].user_id
				     const {data: user} = await axios.get(`/api/users/${user_id}`)     
				     const n = user.avatar
				     const m = n.replace(/\\/g, "/")
				     const path = m.replace('static', '').trim()
				     user.avatar = path
				     data[i].user = user
				}
				this.comments = data
			}
		}
	}
</script>

<style scoped>
 	hr {
 		border:1px solid pink;
 		box-shadow: 0 0 7px rgba(3,3,3,.25);
 	}
	.topicDetail {
		background-image: url('../../../images/bc/topics.jpg');
		padding-top: 120px;
		background-repeat: no-repeat;
		padding-bottom: 120px;
		overflow-y: auto;
		height: 395px;
	}
	.container {
		width: 1000px;
		margin: 0 auto;
	}
	.container form {
		margin: 40px 0;
	}
	.container form label {
		font-weight: bold;
		font-size: 15px;
	}
	.container form button {
		width: 65px;
		height: 64px;
		color: #b8c0cc!important;
		vertical-align: top;
		padding: 4px 15px;
		margin-left: 10px;
		background-color: #e5e9ef;
		outline: none;
		border: 0;
	}
	.container form button:hover {
		background-color: #409EFF;
		color: #fff;
	}
	.comments {
		margin-top: 20px;
		margin-bottom: 60px;
	}
	.comments ul {
		padding: 0;
	}
	.comments ul li {
		list-style: none;
		border: 1px solid #dedede;
		border-radius: 8px;
	}
	.comments p {
		font-size: 20px;
	}
	.comments .comment {
		width: 800px;
		margin-bottom: 20px;
		border-radius: 4px;
	}
	.comments .comment .commentInfo {
		padding: 10px;
		padding-bottom: 0;
	}
	.comments .comment .commentContent {
		padding-left: 10px;
		padding-bottom: 20px;
		color: #666;
		font-size: 14px;
	}
	article {
		text-indent: 2em;
	}
</style>  