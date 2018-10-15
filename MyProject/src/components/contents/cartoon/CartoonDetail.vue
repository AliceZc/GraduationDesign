<template>
	<div class="container">
		<el-card shadow="always">
		<div class="content">
			<img :src="cartoon.img_src">
			<div class="data">
				<h1>{{ cartoon.title }}</h1>
				<p><b>类型:</b> {{ cartoon.type }} </p>
				<p>{{ cartoon.air_year }}年{{cartoon.air_month}}月开播</p>
				<p><b>声优</b>： {{ cartoon.actors }}</p>
				<p><b>简洁</b>:： {{ cartoon.summary }}</p>
			</div>
		</div>
		<a :href="cartoon.link">点击观看</a>
	</el-card>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				cartoon: {
					title: '',
					type: '',
					air_year: '',
					air_month:'',
					actors: '',
					summary: '',
					img_src: '',
					link: ''
				}
			}
		},
		async created () {
			try {
				// 根据 id 获取动漫详情
				const {id} = this.$route.params
				const {data: cartoon} = await axios.get(`/api/cartoon/${id}`)
				

				this.cartoon = cartoon
			
			} catch (err) {

			}
		}
	}
</script>

<style scoped>
	.container {
		margin-top: 60px;
		margin-bottom: 200px;
	}
	.container .content {
		margin: 60px;
	}
	.container .content .data {
		width: 640px;
		height: 300px;
		display: inline-block;
		margin-left: 20px;
		vertical-align: middle;
	}
	.container .content img {
		border-radius: 4px;
		vertical-align: middle;
		margin-left: 160px;
	}
	.container .content .data h1 {
		font-size: 20px;
	}
	.container .content .data p {
		margin-bottom: 15px;
	}
	.container a {
		text-decoration: none;
		margin-left: 270px;
		font-size: 20px;
		color: #fff;
		border: 1px solid pink;
		padding: 10px;
		border-radius: 8px;
		background-color: pink;
		font-weight: bold;
	}
</style> 