<template>
	<div class="container">
		<h3>订单确认</h3>
		<hr>
		<form class="address_info">
			<p>收货地址   
				<span style="color: cyan" @click="defaultInfo">
					<i class="el-icon-location"></i>
					使用默认信息
				</span>
			</p>
			<div>
				<label>收货人:</label><input type="text" placeholder="为了提高发货速度,请填写你的真实姓名" required minlength="2" maxlength="6"  v-model="user_name">
				<label>手机号码:</label><input type="num" required minlength="11" maxlength="11" v-model="user_tel">
			</div>
			<div>
				<label>详细地址:</label>
				<textarea required minlength="10" maxlength="20" v-model="user_address" >
					
				</textarea>
			</div>
		</form>
		
		<router-link :to="{name: 'settke-account'}">
			<button @click="settleAccountHandler" style="background-color: 		 #d33a31;
				border: 0;margin-top: 60px;
				color: #fff;
				font-size: 18px;
				margin-right: 10px;width: 160px;height: 45px"
				>
			结算
			</button>	
		</router-link>
		<h4 style="margin-top: 60px;">您即将购买的商品清单:</h4>
		<table>
			<thead style="text-align: center;">
				<tr>
					<td width="400">商品</td>
					<td width="200">金额</td>
					<td width="200">数量</td>
					<td width="200">小计</td>
					<td width="200">操作</td>
				</tr>
			</thead>
			<tbody v-for="n in orderItems">
				<tr>
					<td style="text-align: center;">
						<img :src="n.item_img" width="80px" height="80px"
								style="vertical-align: middle;">
						<span>
							{{ n.item_name }}
						</span>
					</td>
					<td style="text-align: center">
						<span>¥{{ n.item_price}}</span>
					</td>
					<td style="text-align: center">
						{{ n.total_count }}
					</td>
					<td style="text-align: center">
						<span>¥{{ n.settlement_price}}</span>
					</td>
					<td style="text-align: center">
						<span style="cursor: pointer;" 
								@click="removerOrderItem(n.id)">
						<i class="el-icon-close"></i>
						</span>
					</td>
				</tr>
				
			</tbody>
		</table>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				product: {
					img_src: '',
					name: '',
					price: '',
					type: ''
				},
				num: '',
				yunfei: 10,
				user_name: '',
				user_address: '',
				user_tel: '',
				orderItems: []
			}
		},
		computed: {
			p_totalPrice: function () {
				return (this.product.price - 0) * (this.num - 0) 
			},
			totalPrice: function () {
				return (this.product.price - 0) * (this.num - 0) + this.yunfei
			}
		},
		async created () {
			try {
				const {data: session} = await axios.get('/api/session')
				const session_id = session.id

				const {data: orderItem} = await axios.get(`/api/order/${session_id}`)
				let m = []
				for(let i = 0; i < orderItem.length; i++) {
					if(orderItem[i].state === 0) {
						m.push(orderItem[i])
					}
				}
				this.orderItems = m
			} catch (err) {

			}
		},
		methods: {
			async removerOrderItem(id) {
				const {data: session} = await axios.get('/api/session')
      			const user_id = session.id

				const {data} = await axios.delete(`/api/order/${id}`)
				const {data: orderItems} = await axios.get(`/api/order/${user_id}`)
				this.orderItems = orderItems
			},
			async settleAccountHandler () {
				if (this.orderItems.length === 0) {
					alert('您还未创建订单')
					return
				}
				// 在 orderItem 中 追加 收货姓名 手机号 以及 收货地址
				// 结算后 将 state 修改为 已付款
				const consignee_name = this.user_name
				const consignee_tel = this.user_tel
				const consignee_address = this.user_address
				const orderItems = this.orderItems
				const data = {
					consignee_address,
					consignee_name,
					consignee_tel
				}
				
				for(let i = 0; i < orderItems.length; i++) {
					const orderItem_id = orderItems[i].id
					await axios.post(`/api/appendInfo/${orderItem_id}`, data)
				}
			},
			async defaultInfo () {
				const {data: session} = await axios.get('/api/session')
      			const id = session.id
      			const {data: user} = await axios.get(`/api/users/${id}`)
      			this.user_name = user.name
      			this.user_tel = user.tel
      			this.user_address = user.address
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 1000px;
		margin: 60px auto;
		height: 1000px;
		border-right: 8px;
	}
	.container .address_info {
		border: 1px solid #E5E5E5;
		height: 300px;
	}
	.container .address_info p {
		background-color: #F4F4F4;
		margin: 0px;
		height: 40px;
		line-height: 40px;
		color: #999999;
		text-indent: 2em;
		font-size: 14px;
	}
	.container .address_info input {
		width: 229px;
		height: 22px;
		padding: 6px;
	}
	.container .address_info div {
		margin-top: 35px;
	}
	.container .address_info textarea {
		width: 606px;
		height: 100px;
		vertical-align: top;
	}
	.container .address_info label {
		letter-spacing: 4px;
		margin-left: 20px;
		margin-right: 6px;
	}
	.container .goods_info {
		border: 1px solid #E5E5E5;
		margin-top: 60px;
	}
	.container .goods_info .head {
		background-color: #F4F4F4;
		margin: 0px;
		height: 40px;
		line-height: 40px;
		color: #999999;
		text-indent: 2em;
		font-size: 14px;
	}
	.goods_info .head .s_left {
		margin-right: 556px;
	}
	.goods_info .head span {
		margin-right: 104px;
	}
	.container .goods_info .body { 
		border-bottom: 1px solid #E5E5E5;
		height: 117px;
		position: relative;
	}
	.goods_info .body img {
		width: 80px;
		height: 80px;
		margin: 18px 0 0 20px;
		vertical-align: middle;
	}
	.goods_info .body .s_1{
		position: absolute;
		left: 200px;
		top: 40px;
	}
	.goods_info .body .s_2{
		position: absolute;
		left: 640px;
		top: 40px;
	}
	.goods_info .body .s_3{
		position: absolute;
		left: 790px;
		top: 40px;
	}
	.goods_info .body .s_4{
		position: absolute;
		left: 920px;
		top: 40px;
	}
	.goods_info .heji {
		width: 200px;
		margin-left: 780px;
	}
	.goods_info .heji button {
		margin-top: 20px;
		width: 174px;
		height: 50px;
		line-height: 50px;
		background-color: #d33a31;
		color: #fff;
		border: none;
		cursor: pointer;
		font-size: 16px;
		margin-bottom: 20px;
	}
	.goods_info .heji span {
		margin-right: 64px;
	}
	.letter-spacing {
		letter-spacing: 32px;
	}
</style> 