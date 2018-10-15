<template>
	<div class="con">	
		<div class="body">
			<div class="block">
				<ul style="list-style: none;background-color: #fff;padding: 0">
					<li>
						<p style="color:#0099ff;font-weight:bold">新人俱乐部</p>
						<div>
							<router-link :to="{name: 'forum-block', params: {module: '萌新报道'} }" 
							class="span">
								<img :src="imgs.img_1" height="101" width="250">
								<div style="vertical-align: top">	  
									萌新报道
									<p>新人报道专区❤</p>
									<p class="topicinfo">
										帖子数:
										<span>{{count[0]}}</span>
									</p>
								</div>
							</router-link>
							<router-link :to="{name: 'forum-block', params: {module: '聊天灌水区'} }" class="span">
								<img :src="imgs.img_2" height="102" width="250">
								<div style="vertical-align: top">
									聊天灌水区
									<p>新人的水上乐园❤</p>
									<p class="topicinfo">
										帖子数:
										<span>{{count[1]}}</span>
									</p>
								</div>
							</router-link>
						</div>
					</li>
					<li>
						<p style="color:#0099ff;font-weight:bold">交流讨论区</p>
						<router-link :to="{name: 'forum-block', params: {module: '交流伸手'} }" class="span">
							<img :src="imgs.img_3" height="102" width="250">
							<div style="vertical-align: top">
								交流伸手
								<p>伸手党求资源区❤</p>
								<p class="topicinfo">
									帖子数:
									<span>{{count[2]}}</span>
								</p>
							</div>
						</router-link>
						<router-link :to="{name: 'forum-block', params: {module: '新番讨论'} }" class="span">
							<img :src="imgs.img_4" height="102" width="250">
							<div style="vertical-align: top">
								新番讨论
								<p>新番动漫交流讨论专栏❤</p>
								<p class="topicinfo">
									帖子数:
									<span>{{count[3]}}</span>
								</p>
							</div>
						</router-link>
					</li>
					<li>
						<p style="color:#0099ff;font-weight:bold">动漫资源共享区</p>
						<router-link :to="{name: 'forum-block', params: {module: '动漫资源'} }" class="span">
							<img :src="imgs.img_5" height="102" width="250">
							<div style="vertical-align: top">
								动漫资源
								<p>动漫花园专属板块❤</p>
								<p class="topicinfo">
									帖子数:
									<span>{{count[4]}}</span>
								</p>
							</div>
						</router-link>
						<router-link :to="{name: 'forum-block', params: {module: '完结动漫'} }" class="span">
							<img :src="imgs.img_6" height="102" width="250">
							<div style="vertical-align: top">
								完结动漫
								<p>动漫下载专区❤</p>
								<p class="topicinfo">
									帖子数:
									<span>{{count[5]}}</span>
								</p>
							</div>
						</router-link>
					</li>
					<li>
						<p style="color:#0099ff;font-weight:bold">动漫资源综合区</p>
						<router-link :to="{name: 'forum-block', params: {module: '社友手绘'} }" class="span">
							<img :src="imgs.img_7" height="102" width="250">
							<div style="vertical-align: top">
								社友手绘
								<p>手绘分享区❤</p>
								<p class="topicinfo">
									帖子数:
									<span>{{count[6]}}</span>
								</p>
							</div>
						</router-link>
						<router-link :to="{name: 'forum-block', params: {module: '漫友杂图'} }" class="span">
							<img :src="imgs.img_8" height="102" width="250">
							<div style="vertical-align: top">
								漫友杂图
								<p>动漫杂图专区❤</p>
								<p class="topicinfo">
									帖子数:
									<span>{{count[7]}}</span>
								</p>
							</div>
						</router-link>
					</li>
					<li>
						<p style="color:#0099ff;font-weight:bold">新闻资讯</p>
						<router-link :to="{name: 'forum-block', params: {module: '游戏资讯'} }" class="span">
							<img :src="imgs.img_9" height="102" width="250">
							<div style="vertical-align: top">
								游戏资讯
								<p>游戏新闻资讯专区❤</p>
								<p class="topicinfo">
									帖子数:
									<span>{{count[8]}}</span>
								</p>
							</div>
						</router-link>
						<router-link :to="{name: 'forum-block', params: {module: '新作介绍区'} }" class="span">
							<img :src="imgs.img_10" height="102" width="250">
							<div style="vertical-align: top">
								新作介绍区
								<p>动漫游戏新作推介❤</p>
								<p class="topicinfo">
									帖子数:
									<span>{{count[9]}}</span>
								</p>
							</div>
						</router-link>
					</li>
					<li>
						<p style="color:#0099ff;font-weight:bold">游戏资源</p>
						<router-link :to="{name: 'forum-block', params: {module: '东方Project'} }" class="span">
							<img :src="imgs.img_11" height="102" width="250">
							<div style="vertical-align: top">
								东方Project
								<p>日本同人游戏社团❤</p>
								<p class="topicinfo">
									帖子数:
									<span>{{count[10]}}</span>
								</p>
							</div>
						</router-link>
						<router-link :to="{name: 'forum-block', params: {module: 'ACG游戏专区'} }" class="span">
							<img :src="imgs.img_12" height="102" width="250">
							<div style="vertical-align: top">
								ACG游戏专区
								<p>动漫游戏资源交流❤</p>
								<p class="topicinfo">
									帖子数:
									<span>{{count[11]}}</span>
								</p>
							</div>
						</router-link>
					</li>
					<li>
						<p style="color:#0099ff;font-weight:bold">论坛事务所</p>
						<router-link :to="{name: 'forum-block', params: {module: '论坛事务'} }" class="span"> 
							<img :src="imgs.img_13" height="102" width="250">
							<div style="vertical-align: top">
								论坛事务
								<p>站内事务意见建议❤</p>
								<p class="topicinfo">
									帖子数:
									<span>{{count[12]}}</span>
								</p>
							</div>
						</router-link>
						<router-link :to="{name: 'forum-block', params: {module: '人才招聘'} }" class="span">
							<img :src="imgs.img_14" height="102" width="250">
							<div style="vertical-align: top">
								人才招聘
								<p>招募贤才❤版主申请❤</p>
								<p class="topicinfo">
									帖子数:
									<span>{{count[13]}}</span>
								</p>
							</div>
						</router-link>
					</li>
				</ul>
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
					img_1: require('../../../images/forum/1.jpg'),
					img_2: require('../../../images/forum/2.jpg'),
					img_3: require('../../../images/forum/3.jpg'),
					img_4: require('../../../images/forum/4.jpg'),
					img_5: require('../../../images/forum/5.jpg'),
					img_6: require('../../../images/forum/6.jpg'),
					img_7: require('../../../images/forum/7.jpg'),
					img_8: require('../../../images/forum/8.jpg'),
					img_9: require('../../../images/forum/9.jpg'),
					img_10: require('../../../images/forum/10.jpg'),
					img_11: require('../../../images/forum/11.jpg'),
					img_12: require('../../../images/forum/12.jpg'),
					img_13: require('../../../images/forum/13.jpg'),
					img_14: require('../../../images/forum/14.jpg'),
					home: require('../../../images/home.png')
				},
				count: []
			}
		},
		async created () {
			const modules = {
				modules: 
				['萌新报道','聊天灌水区','交流伸手','新番讨论',
				'动漫资源','完结动漫','社友手绘','漫友杂图',
				'游戏资讯','新作介绍区','东方Project','ACG游戏专区',
				'论坛事务','人才招聘']
			} 
				
			const {data} = await axios.post(`/api/topicCount`,modules)
			this.count = data
		}
	}
</script>

<style scoped>
	.con {
		background-image: url('../../../images/bc/news.jpg');
		background-repeat: repeat;
		background-position: top;
		
		padding: 0 56px;
		padding-top: 100px;
	}
	.body {
		width: 1220px; 
		border-radius: 10px;
		background-color: rgba(255,255,255,.6);
		box-shadow: 0 0 4px rgba(0,0,0,0.3);
		padding: 20px 20px;
	}
	.forum  {

	}	
	.block ul li {
		border: 1px solid #eee;
		margin-top: 20px;
		padding: 20px;
	}
	.block ul li .span {
		display: inline-block;
		margin-left: 100px;
		text-decoration: none;
		font-size: 14px;
		font-weight: 700;
	}
	.block ul li .span p {
		margin: 0;
		padding: 0;
	}
	.block ul li .span .topicinfo{		
		color: cyan;	
		margin-top: 20px;

	}
	.block ul li .span .topicinfo span {
		color: #CC46E7;

	}
	.block ul li .span div {
		display: inline-block;
		color: red;
	}
	.block ul li a div {
		width: 180px;
	}
	.block ul li p {
		border-bottom: 1px solid #eee;
		margin: 0;
		margin-bottom: 20px;
	}
	.block img {
		border: 1px solid #DADADA;
		box-shadow: 0 0 8px rgba(68,68,68,.2);
		margin-right: 10px;
	}
	.block img:hover {
		box-shadow: 0 0 20px rgba(11,215,225,.35);
	}
</style> 