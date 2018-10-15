<template>
	<div class="box">
		<div width="1366" style="overflow: hidden">
			<img src="../../../images/bc/5.png">
		</div>
		<div class="contain">
		<div class="find">
			<h3>筛选</h3>
			<ul class="father_ul">
				<li class="group">
					<ul style="display: inline-block" class="son_ul">
						<li class="son_ul_li">季度</li>
						<li @click="quarterHandler($event.target)">全部</li>
						<li @click="quarterHandler($event.target)">1月</li>
						<li @click="quarterHandler($event.target)">4月</li>
						<li @click="quarterHandler($event.target)">7月</li>
						<li @click="quarterHandler($event.target)">10月</li>
					</ul>
				</li>
				<li class="group">
					<ul style="display: inline-block" class="son_ul">
						<li class="son_ul_li">时间</li>
						<li @click="yearHandler($event.target)">全部</li>
						<li @click="yearHandler($event.target)">2018</li>
						<li @click="yearHandler($event.target)">2017</li>
						<li @click="yearHandler($event.target)">2016</li>
						<li @click="yearHandler($event.target)">2015</li>
						<li @click="yearHandler($event.target)">2014</li>
						<li @click="yearHandler($event.target)">2013</li>
						<li @click="yearHandler($event.target)">2012</li>
						<li @click="yearHandler($event.target)">2011</li>
						<li @click="yearHandler($event.target)">2010</li>
						<li @click="yearHandler($event.target)">更早</li>
					</ul>
				</li>
				<li class="group">
					<ul style="display: inline-block" class="son_ul">
						<li class="son_ul_li">风格</li>
						<li @click="typeHandler($event.target)">全部</li>
						<li @click="typeHandler($event.target)">催泪</li>
						<li @click="typeHandler($event.target)">搞笑</li>
						<li @click="typeHandler($event.target)">科幻</li>
						<li @click="typeHandler($event.target)">恋爱</li>
						<li @click="typeHandler($event.target)">漫改</li>
						<li @click="typeHandler($event.target)">魔法</li>
						<li @click="typeHandler($event.target)">轻改</li>
						<li @click="typeHandler($event.target)">热血</li>
						<li @click="typeHandler($event.target)">日常</li>
						<li @click="typeHandler($event.target)">推理</li>
						<li @click="typeHandler($event.target)">校园</li>
						<li @click="typeHandler($event.target)">音乐</li>
						<li @click="typeHandler($event.target)">运动</li>
						<li @click="typeHandler($event.target)">治愈</li>
					</ul>
				</li>
			</ul>
		</div>
		<ul class="content">
			<li v-for="item in currentCartoons" >
				<router-link :to="{name: 'cartoon-detail', params: {id: item.id} }"  style="text-decoration: none;color: black">
					<img :src="item.img_src">
					<p class="title">{{item.title}}</p>
				</router-link>
			</li>
		</ul>
		<div class="block">	
    		<el-pagination
      			@size-change="handleSizeChange"
      			@current-change="handleCurrentChange"
      			:current-page="currentPage4"
      			:page-sizes="[10]"
      			:page-size="100"
      			layout="total, sizes, prev, pager, next, jumper"
      			:total="totalCount">
    		</el-pagination>
  		</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				cartoons: [],
				totalCount: 0,
				currentCartoons: [],
				filterCartoons: ['全部', '全部', '全部']
			}
		},
		created () {
			this.loadCartoons(1, 10)
		},
		methods: {
			async loadCartoons (page, pageSize) {
				const {data} = 
					await axios .get(`/api/cartoons?_page=${page}&_limit=${pageSize}
					`)
				
				
				for (let i = 0; i < data.cartoons.length; i++) {
					data.cartoons[i].type = data.cartoons[i].type.split(',')
					data.cartoons[i].air_month += '月' 
				}

				this.cartoons = data.cartoons
				this.totalCount = data.count
				this.currentCartoons = this.cartoons
			},
			handleCurrentChange (page) {
				this.loadCartoons(page, 10)
			},
			areaHandler(area) {
				console.log(area.innerHTML)
			},
			quarterHandler(quarter) {
				const quarterIh = quarter.innerHTML

				this.filterCartoons[0] = quarterIh

				this.currentCartoons = this.$options.methods.filter(this.filterCartoons, this.cartoons)
				
				for (let i = 1; i < quarter.parentNode.children.length; i++) {
					quarter.parentNode.children[i].style = "color: black"
				}
				
				quarter.style = "color:#409EFF ;"
			},
			yearHandler (year) {
				const yearIh = year.innerHTML

				this.filterCartoons[1] = yearIh
				
				for (let i = 1; i < year.parentNode.children.length; i++) {
					year.parentNode.children[i].style = "color: black"
				}
				year.style = "color: #409EFF;"

				this.currentCartoons = this.$options.methods.filter(this.filterCartoons, this.cartoons)
			},
			typeHandler (type) {
				const typeIh = type.innerHTML

				this.filterCartoons[2] = typeIh
				
				for (let i = 1; i < type.parentNode.children.length; i++) {
					type.parentNode.children[i].style = "color:black"
				}
				type.style = "color: #409EFF;"

				this.currentCartoons = this.$options.methods.filter(this.filterCartoons, this.cartoons)
			},
			filter (arr, arr1) {
				let ret = []
				if (arr[0] != '全部' && arr[1] != '全部'&&arr[2] != '全部') {
					const n = []
					for (let i = 0; i < arr1.length; i++) {
						if (arr1[i].air_month === arr[0]&&arr1[i].air_year === arr[1]&&arr1[i].type.indexOf(arr[2]) != -1 ) {
							n.push(arr1[i])
						}
					}
					ret  = n
				}
				if (arr[0] === '全部' && arr[1] === '全部'&&arr[2] === '全部') {
					ret = arr1
				}

				if (arr[0] != '全部' && arr[1] === '全部'&&arr[2] === '全部') {
					const m = []
					for (let o = 0; o < arr1.length; o++) {
						if (arr1[o].air_month === arr[0]) {
							m.push(arr1[o])
						}
					}
					ret  = m
				}
				if (arr[0] === '全部' && arr[1] === '全部'&&arr[2] != '全部') {
					const k = []
					for (let p = 0; p < arr1.length; p++) {
						if (arr1[p].type.indexOf(arr[2]) != -1) {
							k.push(arr1[p])
						}
					}
					ret  = k
				}
				if (arr[0] === '全部' && arr[1] != '全部'&&arr[2] === '全部') {
					const l = []
					for (let g = 0; g < arr1.length; g++) {
						if (arr1[g].air_year === arr[1]) {
							l.push(arr1[g])
						}
					}
					ret  = l
				}

				if (arr[0] != '全部' && arr[1] === '全部'&&arr[2] != '全部') {
					const j = []
					for (let f = 0; f < arr1.length; f++) {
						if (arr1[f].air_month === arr[0]&&arr1[f].type.indexOf(arr[2]) != -1) {
							j.push(arr1[f])
						}
					}
					ret  = j
				}
				if (arr[0] != '全部' && arr[1] != '全部'&&arr[2]==='全部') {
					const u = []
					for (let d = 0; d < arr1.length; d++) {
						if (arr1[d].air_month === arr[0]&&arr1[d].air_year === arr[1]) {
							u.push(arr1[d])
						}
					}
					ret  = u
				}
				if (arr[0] === '全部' && arr[1] != '全部'&&arr[2] != '全部') {
					const s = []
					for (let t = 0; t < arr1.length; t++) {
						if (arr1[t].air_year === arr[1]&&arr1[t].type.indexOf(arr[2]) != -1) {
							s.push(arr1[t])
						}
					}
					ret  = s
				}
				return ret
			}
		}
	}
</script>

<style scoped>
	.box {
		background-image: linear-gradient(180deg, #0A374D, white)
	}
	.contain {
		width: 1000px;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 20px;
	}
	.contain .find {
		margin-left: 40px;
		padding-top: 20px;
	}
	.find {
		
	}
	.find .father_ul {
		padding: 0px;
	}
	.find ul li {
		list-style: none;
		font-size: 14px;
	}
	.find .son_ul {
		overflow: hidden;
		padding: 0px;
	}
	.find .son_ul li {
		float: left;
		margin-right: 20px;
		vertical-align: top;
		padding: 6px;
	}
	.find ul .son_ul li:hover {
		cursor: pointer;
	}
	.contain .content li {
		display: inline-block;
		list-style: none;
		width: 210px;
		margin-right: 10px;
		margin-bottom: 40px;
	}
	.contain .content li img {
		width: 160px;
		height: 214px;
		border-radius: 5px;
	}
	.contain .content li p {
		margin: 0 auto;
	}
	.son_ul_li {
		color: #99a2aa;
	}
</style> 