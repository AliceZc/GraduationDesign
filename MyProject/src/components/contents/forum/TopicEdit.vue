<template>
<div class="topicDetail">
	<div class="container">
		<el-card shadow="always" style="background-color: rgba(255,255,255,.6);
		box-shadow: 0 0 4px rgba(0,0,0,0.3);">
			<form @submit.prevent="editHandler">
			<label>上传版块</label>
			<br>
			<el-select  	
					placeholder="请输入内容"
					v-model="formData.module"
					>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
			</el-select>
			<br>
			<br>
			<label class="form_title">标题</label>
			<br>
			<el-input  	
					required
					v-model="formData.title">		
			</el-input>
			<br>
			<br>
			<label>内容</label>
			<br>
			<el-input
 				 type="textarea"
 				 :rows="8"
 				 required
 				 v-model="formData.content">
			</el-input>
			<br>
			<br>	
			<button type="submit" class="button" style="border: 0">Submit</button>
			</form>
		</el-card>
	</div>
</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				formData: {
					title: '',
					content: '',
					module:''
				},
				options: [{
					value: '萌新报道',
					label: '萌新报道'
				},{
					value: '聊天灌水区',
					label: '聊天灌水区'
				},{
					value: '交流伸手',
					label: '交流伸手'
				},{
					value: '新番讨论',
					label: '新番讨论'
				},{
					value: '动漫资源',
					label: '动漫资源'
				},{
					value: '完结动漫',
					label: '完结动漫'
				},{
					value: '社友手绘',
					label: '社友手绘'
				},{
					value: '漫友杂图',
					label: '漫友杂图'
				},{
					value: '游戏资讯',
					label: '游戏资讯'
				},{
					value: '新作介绍区',
					label: '新作介绍区'
				},{
					value: '东方Project',
					label: '东方Project'
				},{
					value: 'ACG游戏专区',
					label: 'ACG游戏专区'
				},{
					value: '论坛事务',
					label: '论坛事务'
				},{
					value: '人才招聘',
					label: '人才招聘'
				}]
			}
		},
		created () {
			const {id} = this.$route.params
			this.loadTopicById(id)
		},
		methods: {
			async loadTopicById (id) {
				const {data: topic} = await axios.get(`/api/topic/${id}`)
				this.formData = topic
			},
			async editHandler () {
				try {
					const {id, title, content,module} = this.formData
					await axios.patch(`/api/topics/${id}`, {
						title,
						content,
						module
					})
					this.$router.back()
				} catch (err) {
					window.alert('修改失败,请稍候重试!')
				}
			}
		}
	}
</script>

<style scoped>
	.topicDetail {
		background-image: url('../../../images/bc/topics.jpg');
		padding-top: 120px;
		background-repeat: no-repeat;
		padding-bottom: 60px;
	}
	.container {
		width: 1000px;
		margin: 0 auto;
	}
	.container form {
		margin-top: 40px;
	}
	.container form label {
		color: #20a0ff;
		font-weight: 700;
		display: block;
	}
	.container form label:hover {
		color: #FF40C9;
	}
	.button {
		background-color: #b3d8ff;
		color: #fff;
		outline: none;
		font-weight: 500;
		padding: 12px 20px;
		border-radius: 6px;
		font-size: 14px;
	}
	.button:hover {
		background-color: #409eff;
	}
</style> 