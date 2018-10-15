<template>
	<div class="contain">	
		<div class="body" >
			<div class="filter">
				<p style="font-size: 14px;font-weight: 700;color: #333;margin: 0px;padding: 10px; ">	版块导航
				</p>
				<ul id="fa_ul">
					<li>
						<p>新人俱乐部</p> 
						<ul class="son_ul">
							<li @click ="moduleHandler($event.target)">
								萌新报道
							</li>
							<li @click ="moduleHandler($event.target)">
								聊天灌水区
							</li>
						</ul>
					</li>
					<li>
						<p>交流讨论区</p>
						<ul class="son_ul">
							<li @click ="moduleHandler($event.target)">
								交流伸手
							</li>
							<li @click ="moduleHandler($event.target)">
								新番讨论
							</li>
						</ul>
					</li>
					<li>
						<p>动漫资源共享区</p>
						<ul class="son_ul">
							<li @click ="moduleHandler($event.target)">
								动漫资源
							</li>
							<li @click ="moduleHandler($event.target)">
								完结动漫
							</li>
						</ul>
					</li>
					<li>
						<p>动漫资源综合区</p>
						<ul class="son_ul">
							<li @click ="moduleHandler($event.target)">
								社友手绘
							</li>
							<li @click ="moduleHandler($event.target)">
								漫友杂图
							</li>
						</ul>
					</li>
					<li>
						<p>新闻资讯</p>
						<ul class="son_ul">
							<li @click ="moduleHandler($event.target)">
								游戏资讯
							</li>
							<li @click ="moduleHandler($event.target)">
								新作介绍区
							</li>
						</ul>
					</li>
					<li>
						<p>游戏资源</p>
						<ul class="son_ul">
							<li @click ="moduleHandler($event.target)">
								东方Project
							</li>
							<li @click ="moduleHandler($event.target)">
								ACG游戏专区
							</li>
						</ul>
					</li>
					<li>
						<p>论坛事务所</p>
						<ul class="son_ul">
							<li @click ="moduleHandler($event.target)">
								论坛事务
							</li>
							<li @click ="moduleHandler($event.target)">
								人才招聘
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="show">
				<img :src="imgs.img_1" width="600">
				<a href="#/CreateTopic" style="display: block;margin-top: 20px;">
					<el-button type="primary" plain>
						发帖
					</el-button>
				</a>
				<div class="topics">
					<table>
						<thead>
							<tr>
								<td width="500">帖子</td>
								<td width="100">作者</td>
								<td>时间</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in topics">
								<td style="color: #EE1B2E;font-weight: bold;">
									<p style="margin: 0;margin-top: 15px;		font-size: 14px;">
										<i class="el-icon-document" style="color:#f5c006;font-size: 20px">
										</i>
										<router-link :to="{name: 'topic-detail', params: {id: item.id}}" style="text-decoration: none">
											{{ item.title }}
										</router-link>
									</p>
								</td>
								<td style="color: rgb(255, 0, 0);text-align: center;width: 200px">
									{{item.author}}
								</td>
								<td style="color: rgba(11,215,225,.8);text-align: center;width: 150px">
									{{item.create_time}}
								</td>
							</tr>
						</tbody>
					</table>	
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			 return {
       			imgs: {
					img_1: require('../../../images/forum/forumblock/2.jpg')
				},
				topics: [],
				module: ''
			}
		},
		async created () {
			const {module} = this.$route.params
			this.module = module
			const moduleName = {
				name: this.module
			}
			
			const {data} = await axios.post(`/api/findTopics`, moduleName)
			for(let i = 0; i < data.topics.length; i++) {
				var date2 = new Date(data.topics[i].create_time)
				data.topics[i].create_time = date2.toLocaleDateString()
				const id = data.topics[i].user_id
          		const {data: user} = await axios.get(`/api/users/${id}`)
          		data.topics[i].author = user.nickname
          		console.log(data.topics[i].author)
			}
			this.topics = data.topics
		},
		methods: {
			async moduleHandler (e) {
				this.module = e.innerHTML.trim('')
				const moduleName = {
					name: this.module
				}
				const {data} = await axios.post(`/api/findTopics`, moduleName)
				for(let i = 0; i < data.topics.length; i++) {
					var date2 = new Date(data.topics[i].create_time)
					data.topics[i].create_time = date2.toLocaleDateString()
				}
				this.topics = data.topics
				
				const n = document.getElementById("fa_ul")
				const m = n.querySelectorAll("li")
				for(let i = 0; i < m.length; i++) {
					m[i].style="color: #333"
				}
				e.style = "color:#409EFF ;"
			}
		}
	}
</script>

<style scoped>
	.contain {
		background-image: url('../../../images/bc/news.jpg');
		background-repeat: repeat;
		background-position: top;
		
		padding: 0 56px;
		padding-top: 100px;
	}
	.body {
		width: 1220px; 
		border-radius: 10px;
		background-color: rgba(255,255,255,.1);
		box-shadow: 0 0 4px rgba(0,0,0,0.3);
		padding: 60px 20px;
	}
	.filter {
		background-color: #fff;
		padding: 10px 0;
		display: inline-block;
		border: 1px solid #DCDFE6;
		margin-left: 20px;
		margin-right: 40px;
		vertical-align: top;
	}
	.filter ul li p {
		margin: 0;
		width: 155px;
		font-size: 14px;
		background-image: linear-gradient(180deg, #fff, #96C6EE);
		padding: 0 15px 0 10px;
	}
	.filter ul {
		margin: 0;
		padding: 0;
		color: #333;
	}
	.filter li {
		list-style: none;
		font-size: 14px;
	}
	.filter .son_ul {
		padding: 0 15px 0 10px;
		color: #333;
		cursor: pointer;
		padding: 0 15px 0 10px;
	}
	.filter .son_ul li {
		color: #333;
		font-size: 12px;
		margin: 8px 0;

	}
	.filter .son_ul li:hover {
		color: #0099ff;
	}
	.show {
		display: inline-block;
	}
	.show img {
		box-shadow: 0 0 20px rgba(11,215,225,.8);
		vertical-align: top;
	}
	.topics {
		margin-top: 20px;
		border: 2px dashed pink;
		padding: 20px;
	}
	.topics thead {
		background-color: cyan;
	}
	.topics thead td {
		text-align: center;
		font-size: 14px;
		color: white;
	}
	.topics tbody tr {
	
	}	
</style> 