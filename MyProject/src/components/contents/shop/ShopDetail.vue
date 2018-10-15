<template>
	<div class="container">
		<p>
			<el-breadcrumb separator-class="el-icon-arrow-right" 
		style="font-size: 18px;">
  			<el-breadcrumb-item :to="{ path: '/Shop' }">商城首页</el-breadcrumb-item>
  			<el-breadcrumb-item>商品详情</el-breadcrumb-item>
			</el-breadcrumb>
		</p>
		<hr>
		<div class="detail">
			<img :src="production.img_src">
			<div class="de_right">
				<h3>{{ production.name }}</h3>
				<br>
				<p style="color:#d33a31;font-size:30px">￥{{ production.price }}</p>
				<div class="data">
					<label>数量</label>
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="200"></el-input-number>
					<br>
					<p>
						<span>服务:</span>
					</p>
					<div class="btn_group">
						<router-link :to="{name: 'order', params: {id: user_id}}">
							<button class="btn_1" @click="buyNowHandler">立即购买</button>
						</router-link>
						
						
						<button class="btn_2" @click="addToShopCar">加入购物车</button>					
					</div>
				</div>
			</div>
		</div>
		<ul class="tips">
			<li>100%正品</li>
			<li>七天无理由退货</li>
			<li>
				<a href="#/ShopCar">
					<i class="iconfont icon-gouwuche1"></i>
					<span>购物车</span>
				</a>
			</li>
			<li>订单</li>
		</ul>
		<div class="notice">
			<section>
				<span>
					购买须知：
				</span>
				<p>				
					商品购买成功后，会在48小时内发货，法定节假日顺延，请在确认商品完好后再签收。
				</p>
				<p>若存在质量问题，请务必在签收后7天内联系客服。</p>
			</section>
			<section>
				<span>
					售后服务承诺：
				</span>
				<p>				
					如何申请退换货：
				</p>
				<p>自您签收产品快递起7日内（含），如果您所购买的产品存在质量问题，请第一时间联系网易云音乐客服（向“云音乐客服”账号私信反馈）。</p>
			</section>
			<section>
				<span>
					退换货说明：
				</span>
				<p>				
					因个人原因包括色差问题，个人不喜欢不满意等退货必须在未拆开包装的前提下方可换货，并应当保证产品完好、包装完整，且不影响二次销售。遭人为损坏的商品不提供7天无理由退换货服务，敬请谅解。
				</p>
				<p>无法享受7天内无理由退换的情况，包括但不仅限于以下：</p>
				<p>1）签收产品超出7天后，提出售后申请；</p>	
				<p>2）人为原因，包括强行折损，撕扯，人为污损的；</p>
				<p>3）非产品本身原因出现破损（如宠物撕咬、不小心被尖锐物划伤等）；</p>
				<p>4）因使用者使用不当造成产品出现质量问题。</p>
			</section>
			<section>
				<span>
					退货注意事项：
				</span>
				<p>1）商品的完整标配指原厂包装及其他所有配件；</p>	
				<p>2）因质量问题，退货运费由网易云音乐承担；因个人原因（包括色差问题，个人不喜欢不满意等退货）且未拆封情况下的退换货产生的寄回运费，由用户个人承担；</p>
				<p>3）请您支付寄回的快递费（到付件一律拒收），核对为质量问题后网易云音乐会报销寄回的快递费（最高22元），请将快递发票随货寄出（无发票不报销）。</p>
			</section>
			<section>
				<span>退换货流程：</span>
				<p>向客服申请退货—客服审核—审核通过后，用户寄回商品—验收核对—退款或重新寄。</p>
			</section>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
    	data() {
      		return {
        		num1: 1,
        		production: {
        			price: '',
        			img_src: '',
        			name: ''
        		},
        		user_id: 0
      		}
    	},
    	async created () {
    		const {id} = this.$route.params
    		const {data: production} = await axios.get(`/api/production/${id}`)
    		this.production = production

    		const {data: session} = await axios.get('/api/session')
			const session_id = session.id

			this.user_id = session_id
    	},
    	methods: {
      		handleChange(value) {
       	 		console.log(value);
      		},
      		async buyNowHandler () {
      			// 创建一个orderItem
      				const item_id = this.$route.params.id
      				const orderItemData = {
      					state: 0, // 购物车中的状态码
      					item_id: parseInt(item_id), // 商品id
      					item_img: this.production.img_src,
      					item_name: this.production.name, // 商品名称
      					total_count: this.num1,
      					item_price: this.production.price,
      					settlement_price: this.num1 * this.production.price,
      					user_id: this.user_id,
      					shopping_car_id: 0,
      					is_selected: 1, // 是否被选中, 0: 未被选中, 1：选中, 默认选中
      					order_type: 1
      				}
      				const {data: orderItem} = await axios.post('/api/order', orderItemData)
      		},
      		async addToShopCar () {
   				try {
   					// 得到当前登录用户的登录状态
      				const {data: session} = await axios.get('/api/session')
      				const id = session.id
      				// 获取该用户的专属购物车
      				const {data: shopCar} = await axios.get(`/api/shopCar/${id}`)
      				console.log(shopCar)
      				const shopCar_id = shopCar[0].id
      				// 创建一个carItem
      				const item_id = this.$route.params.id
      				const carItemData = {
      					state: 0, // 购物车中的状态码
      					item_id: parseInt(item_id), // 商品id
      					item_img: this.production.img_src,
      					item_name: this.production.name, // 商品名称
      					total_count: this.num1,
      					item_price: this.production.price,
      					settlement_price: this.num1 * this.production.price,
      					user_id: id,
      					shopping_car_id: shopCar_id,
      					is_selected: 1, // 是否被选中, 0: 未被选中, 1：选中, 默认选中
      					order_type: 0
      				}
      				const {data: carItem} = await axios.post('/api/carItem', carItemData)
      				console.log(carItem)
      				
   				} catch (err) {
   					// alert('请登录')
   					// this.$router.push('/Login')
   				}
      			
      		}

    	}
  	}
</script>

<style scoped>
	.container {
		width: 1000px;
		margin: 60px auto;
	}
	.container img {
		padding: 80px;
		vertical-align: middle;
		margin-right: 60px;
		background-color: #FBFBFB;
	}
	.container .de_right {
		display: inline-block;
		vertical-align: middle;
	}
	.de_right .btn_group {
		margin-top: 60px;
	}
	.de_right .btn_group button {
		width: 160px;
		height: 45px;
	}
	.de_right .btn_group .btn_1 {
		border: 2px solid #d33a31;
		background-color: #fff;
		color: #d33a31;
		font-size: 18px;
		margin-right: 10px;
	}
	.de_right .btn_group .btn_2 {
		background-color: #d33a31;
		border: 0;
		color: #fff;
		font-size: 18px;
		margin-right: 10px;
	}
	.tips {
		list-style: none;
		position: fixed;
		right: 20px;
		top: 200px;
		border: 1px solid rgba(0, 0, 0, 0.4);
		padding: 0;
	}
	.tips li {
		width: 40px;
		height: 40px;
		border-bottom: 1px solid #DFDFDF;
		padding: 10px;
		font-size: 12px;
		text-align: center;
	}
	.tips li i {
		font-size: 30px;
		font-weight: bold;
	}
	.tips a {
		color: #333333;
		text-decoration: none;
	}
	.notice section {
		margin-bottom: 20px;
	}
	.notice {
		margin-top: 200px;
	}
	.notice span{
		font-size: 15px;
		font-weight: bold;
		color: #666;
		line-height: 18px;
		padding: 5px 0;
	}
	.notice p {
		padding: 5px 0;
		margin: 0;
		font-size: 14px;
		color: #666;
		width: 700px;
	}
</style> 