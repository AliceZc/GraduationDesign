<template>
	<div class="ProductUp">
		<el-card shadow="always">
			<label>商品名</label>
			<br>
			<br>
			<el-input v-model="form.name" placeholder="请输入内容" clearable style="width: 200px"></el-input>
			<br>
			<br>
			<div>
				<label>价格</label>
				<el-input-number v-model="form.price"></el-input-number>
			</div>
			<br>
			<div>
				<label>类型</label>
				<br>
				<br>
				<el-input v-model="form.type" placeholder="请输入内容" clearable style="width: 400px"></el-input>
			</div>
			<br>
			<div>
				<label>图片地址</label>
				<br>
				<br>
				<el-input v-model="form.img_src" placeholder="请输入内容" clearable style="width: 600px"></el-input>
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
					name: '',
					price: 1,
					type: '',
					img_src: ''
				}
			}
		},
		methods: {
			async formHandler () {
				console.log(this.form)
				const {data} = await axios.post('/api/productUp', this.form)
			}
    	}
	}
</script>

<style scoped>
	.productUp {
		padding: 40px;
	}
	label {
		color: #409EFF;
	}
</style> 