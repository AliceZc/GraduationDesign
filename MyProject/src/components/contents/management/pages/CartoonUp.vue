<template>
	<div class="CartoonUp">
		<el-card shadow="always">
			<label>番名</label>
			<el-input v-model="form.title" placeholder="请输入内容" clearable style="width: 200px"></el-input>
			<br>
			<br>
			<div>
    			<span class="demonstration">年</span>
    			<el-date-picker
      				v-model="form.air_year"
      				type="year"
      				placeholder="选择年"
      				style="width: 120px">
    			</el-date-picker>
    			<span class="demonstration">月</span>
    			<el-date-picker
     				v-model="form.air_month"
      				type="month"
     				placeholder="选择月"
     				style="width: 120px">
    			</el-date-picker>
  			</div>
  			<br>
			<div>
				<label>类型</label>
				<el-input v-model="form.type" placeholder="请输入内容" clearable style="width: 400px"></el-input>
			</div>
			<br>
			<div>
				<label>声优</label>
				<el-input v-model="form.actors" placeholder="请输入内容" clearable style="width: 600px"></el-input>
			</div>
			<br>
			<div>
				<label>简介</label>
				<el-input v-model="form.summary" placeholder="请输入内容" clearable></el-input>
			</div>
			<br>
			<div>
				<label>开播时间</label>
				<el-input v-model="form.play_time" placeholder="周几" clearable style="width: 60px"></el-input>
			</div>
			<br>
			<div>
				<label>链接地址</label>
				<el-input v-model="form.link" placeholder="请输入内容" clearable style="width: 400px"></el-input>
			</div>
			<br>
			<div>
				<label>图片地址</label>
				<el-input v-model="form.img_src" placeholder="请输入内容" clearable style="width: 400px"></el-input>
			</div>
			<br>
			<el-button @click="formHandler">上传</el-button>
    	</el-card>
	</div>
</template>

<script>
	import $ from 'jquery'
	import axios from 'axios'
	export default {
		data () {
			return {
				form: {
					title: '',
					type: '',
					actors: '',
					summary: '',
					img_src: '',
					air_year: 0,
					air_month: 0,
					link: '',
					play_time: ''
				}
			}
		},
		methods: {
			async formHandler () {
				console.log(this.form)
				const {data} = await axios.post('/api/cartoonUp', this.form)
			}
    	}
	}
</script>

<style scoped>
	.cartoonUp {
		padding: 40px;
	}
</style> 