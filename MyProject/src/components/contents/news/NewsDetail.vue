<template>
	<div class="container">
		<el-breadcrumb separator-class="el-icon-arrow-right" 
		style="font-size: 18px;">
  			
		</el-breadcrumb>
		<div class="news_detail">
			<h3>{{ news.title }}</h3>
			<span>发布于{{ news.time }}</span>
			<p>{{ news.content }}</p>
			<img :src="news.img_src" style="display: block;margin: 20px auto;max-width: 600px">
		</div>
			<div class="comments">
			<p>评论</p>
			<div v-for="item in newsComments" class="comment">			
					<div class="commentInfo">
						<span>{{item.create_time}}</span> 评论 <span> </span>
					</div>		
					<div class="commentContent">
						{{ item.content }}
					</div>
			</div>
	</div>
		<form @submit.prevent="createCommentHandler">
			<div>
				<label>添加回复</label>
				<br>
				<br>
				<textarea v-model.trim="newsCommentContent" cols="100" rows="3"></textarea>
			</div>
			<button type="submit" class="button">回复</button>
		</form>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				news: {
					title: '',
					content: ''
				},
				newsComments: [],
				newsCommentContent: '',
				isLoginUser: false
			}
		},
		async created () {
			try {
				// 根据 id 获取资讯详情
				const {id} = this.$route.params
				console.log(id)
				const {data: news} = await axios.get(`/api/news/${id}`)
				this.news = news


				this.loadNewsComments(id)
			} catch (err) {

			}
		},
		methods: {
			async createCommentHandler () {
				try {
					await axios.get('/api/session')
					// 先校验是否已登录，没有登录则提示去登录
					const {data} = await axios.post('/api/newsComment', {
						news_id: this.news.id,
						content: this.newsCommentContent
					})
					this.newsComments.push(data)
					this.newsCommentContent=''
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
			},
			async loadNewsComments(newsId) {
				const {id} = this.$route.params

				const {data} = await axios.get(`/api/newsComment?news_id=${id}`)
				this.newsComments = data
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 1000px;
		margin: 60px auto;
	}
	.container .news_detail {
		margin-top: 60px;
	}
	.container .news_detail p {
		margin-top: 60px;
		text-indent: 2em;
	}
	.comments {
		margin-top: 200px;
	}
	.comments p {
		font-size: 20px;
	}
	.comments .comment {
		width: 800px;
		border: 1px solid #C8C0C0;
		margin-bottom: 20px;
		border-radius: 4px;
	}
	.comments .comment .commentInfo {
		padding: 10px;
		background-color: #eee;
	}
	.comments .comment .commentContent {
		padding: 10px;
	}
	article {
		text-indent: 2em;
	}
	.button {
		background-color: #b3d8ff;
		color: #fff;
		outline: none;
		font-weight: 500;
		padding: 12px 20px;
		border-radius: 6px;
		font-size: 14px;
		border: 0;
		margin-top: 20px;
	}
	.button:hover {
		background-color: #409eff;
	}
</style>  