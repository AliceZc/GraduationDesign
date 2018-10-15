<template>
	<div class="box">
		<div class="container">
  		<div class="lunbo">
    		<el-carousel height="375px">
      			<el-carousel-item v-for="item in images">
        			<img
        			:src="item.src" width="600px" height="375px">
      			</el-carousel-item>
    		</el-carousel>
  		</div>
		<div class="newsToday">
			<p>今日推荐<span style="color: red">HOT</span></p>
			<ul>
				<li v-for="item in todayHot" :key="item" @click="addHits(item.id)">
					<router-link :to="{name: 'news-detail', params: {id: item.id}}">
						{{item.title}}
					</router-link>
				</li>
			</ul>
		</div>
		<div class="newsDetail">
			<ul>
				<li v-for="item in news" :key="item" @click="addHits(item.id)">
					<img :src="item.img_src" width="140" height="140">
					<div class="newsTitle">	
						<p style="margin: 0">
							<router-link :to="{name: 'news-detail', params: {id: item.id}}"
							style="color: #404040;text-decoration: none;">
								{{item.title}}
							</router-link>
						</p>
						<span class="newsTag">{{ item.time}}</span> 
						<span class="hitsTag">点击量   {{ item.hits }}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="sortNews">
			<p style="margin: 0px;border: 1px solid #2F77D8;
			padding: 10px;border-radius: 10px;background-color: #2F77D8;color: #fff;
			text-align: center">点击排行</p>
			<div class="sortDetail">
				<ol style="padding-left: 20px;" class="round-list">
					<li v-for="item in sortNews" :key="item" style="margin-bottom: 20px;
					border-bottom: 1px solid #ccc" @click="addHits(item.id)">
						<router-link 
						:to="{name: 'news-detail', params: {id: item.id}}"
						style="color: #404040;text-decoration: none;">
							{{item.title}}
						</router-link>
						<br>
						<p style="margin: 10px 0;">
							点击量 {{ item.hits }}
						</p>
					</li>
				</ol>
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
				news: [],
				todayHot: [],
				sortNews: [],
				images: [
					{
						src: require('../../../images/8.jpeg')
					},
					{
						src: require('../../../images/9.jpg')
					},
					{
						src: require('../../../images/10.jpg')
					},
					{
						src: require('../../../images/11.jpg')
					},
					{
						src: require('../../../images/12.jpg')
					}
				]
			}
		},
		created () {
			this.loadnews()
		},
		methods: {
			async loadnews () {
				const {data} = 
					await axios .get(`/api/news?_page`)
				
				this.news = data.news
				console.log(data)
				// todayHot
				var n = []
				for (var i = 0; i < 7; i++) {
					n[i] = data.news[i]
				}
				this.todayHot = n
				// lunbo
				var m = []
				for (var i = 0; i < 4; i++) {
					m[i] = data.news[i]
				}
				this.lunboImgs = m	
				// sortNews

				function compare(property){
    				return function(a,b){
        				var value1 = a[property];
        				var value2 = b[property];
       					 return value2 - value1;
    				}
				}
				this.sortNews = data.news.sort(compare('hits'))	
			},
			async addHits (id) {
				const {data} = await axios.get(`/api/addHits/${id}`)
			}
		}
	}
</script>

<style scoped>
	.box {
		
	}
	.container {
		width: 1100px;
		margin: 60px auto;
		height: 600px;
		position: relative;
	}
  	.lunbo {
  		display: inline-block;
  		width: 554px;
  	}
  	.newsToday {
		display: inline-block;
		margin-left: 20px;
		vertical-align: top;
  	}
  	.newsToday p {
  		font-size: 20px;
  		font-weight: bold;
  		font-style: italic;
  	}
  	.newsToday ul {
  		list-style: none;
  		padding: 0;
  	}
  	.newsToday ul li {
  		margin-bottom: 20px;
  	}
  	.newsToday ul li a {
  		text-decoration: none;
  		color: #404040;
  	}
  	.newsDetail {
  		margin-top: 80px;
  		width: 800px;
  		display: inline-block;
  	}
  	.newsDetail ul {
  		list-style: none;
  		padding: 0;
  	}
  	.newsDetail ul li {
  		margin-bottom: 20px;
  	}
  	.newsDetail p {
  		width: 400px;
  	}
  	.newsTitle {
  		display: inline-block;
  		margin-left: 20px;
  		vertical-align: top;
  		font-weight: normal;
  		font-style: normal;
  		font-size: 20px;
  		position: relative;
  	}
  	.newsTag {
  		position: absolute;
		top: 120px;
		font-size: 15px;
		color: #bbb;
  	}
  	.sortNews {
  		position: absolute;
		top: 530px;
		left: 700px;
		width: 400px;
  	}
	.hitsTag {
		position: absolute;
		top: 120px;
		left: 100px;
		font-size: 15px;
		color: #bbb;
	}
</style> 