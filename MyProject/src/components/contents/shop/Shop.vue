<template>
	<div>
		<div class="lunbo">
			<el-carousel indicator-position="inside" height="387px">
    			<el-carousel-item v-for="item in images" :key="item" >
      			<img :src="item.src" width="1100px">
    			</el-carousel-item>
  			</el-carousel>
		</div>
		<div class="productions" id="product">
			<div class="p_group" id="shouban">
				<h3>精美手办</h3>
				<hr>
				<div v-for="item in  shoubans" class="area">
					<router-link :to="{name: 'shop-detail', params: {id: item.id}}"
						style="text-decoration: none;color: black">
						<img :src="item.img_src">
					</router-link>	
				</div>					
			</div>
			<div class="p_group" id="jiaju">
				<h3>精美家居</h3>
				<hr>
				<div v-for="item in  jiajus" class="area">
					<router-link :to="{name: 'shop-detail', params: {id: item.id}}"
						style="text-decoration: none;color: black">
						<img :src="item.img_src">
					</router-link>	
				</div>
			</div>
			<div class="p_group" id="baobao">
				<h3>精美包包</h3>
				<hr>
				<div v-for="item in  baobaos" class="area">
					<router-link :to="{name: 'shop-detail', params: {id: item.id}}"
						style="text-decoration: none;color: black">
						<img :src="item.img_src">
					</router-link>	
				</div>
			</div>
			<div class="p_group" id="shipin">
				<h3>精美饰品</h3>
				<hr>
				<div v-for="item in  shipins" class="area">
					<router-link :to="{name: 'shop-detail', params: {id: item.id}}"
						style="text-decoration: none;color: black">
						<img :src="item.img_src">
					</router-link>	
				</div>
			</div>
			<div class="p_group" id="zhongbiao">
				<h3>精美钟表</h3>
				<hr>
				<div v-for="item in  zhongbiaos" class="area">
					<router-link :to="{name: 'shop-detail', params: {id: item.id}}"
						style="text-decoration: none;color: black">
						<img :src="item.img_src">
					</router-link>	
				</div>
			</div>
			<div class="p_group" id="wenti">
				<h3>精美文体</h3>
				<hr>
				<div v-for="item in  wentis" class="area">
					<router-link :to="{name: 'shop-detail', params: {id: item.id}}"
						style="text-decoration: none;color: black">
						<img :src="item.img_src">
					</router-link>	
				</div>
			</div>
		</div>
		<ul class="shopNav">
			<li><a href="#shouban">手办</a></li>
			<li><a href="#jiaju">家具</a></li>
			<li><a href="#baobao">包包</a></li>
			<li><a href="#shipin">饰品</a></li>
			<li><a href="#zhongbiao">钟表</a></li>
			<li><a href="#wenti">文体</a></li>
			<li>
				<a href="#product">
					TOP		
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				images: [
					{
						src: require("../../../images/1.jpg")
					},
					{
						src: require("../../../images/2.jpg")
					},
					{
						src: require("../../../images/3.jpg")
					}
				],
				shoubans: [],
				jiajus: [],
				wentis: [],
				baobaos: [],
				shipins: [],
				zhongbiaos: []
			}
		},
		created () {
			this.loadProduction()
		},
		methods: {
			async loadProduction(page, limit) {
				const  res = await axios.get('/api/productions')
				this.shoubans = res.data.shoubans
				this.jiajus = res.data.jiajus
				this.wentis = res.data.wentis
				this.shipins = res.data.shipins
				this.zhongbiaos = res.data.zhongbiaos
			}
		}
	}
</script>

<style scoped>
	.lunbo {
		width: 1100px;
		margin: 0 auto;
		margin-top: 120px;
	}
	.productions {
		width: 1100px;
		margin: 20px auto;
	}
	.productions .area {
		display: inline-block;
	}
	.productions .area a {
		text-decoration: none;
		color: black;
		font-weight: bold;
	}
	.productions .area img {
		margin-right: 3px;
		border-radius: 4px;
	}
	.productions .area p {
		text-align: center;
	}
	.shopNav {
		position: fixed;
		left: 20px;
		top: 120px;
		list-style: none;
		border: 1px solid #999999;
		width: 60px;
		padding: 0;
		background-color: #F6F9FA;
	}
	.shopNav li {
		padding: 10px 0;
	}
	.shopNav li a {
		text-decoration: none;
		color: black;
		padding: 14px;
	}
	.shopNav li a p {
		text-align: center;
		margin: 0;
	}
	.shopNav li:hover {
		background-color: #A0C5E8;
	}
	.el-icon-arrow-up {
		font-size: 20px;
		font-weight: 600;
	}
</style> 