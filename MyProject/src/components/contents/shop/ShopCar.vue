<template>
	<div class=	"container">
		<h3>购物车</h3>
		<hr>
		<div class="car" v-show="isEmpty">
			<i class="iconfont icon-gouwuche1"></i>
			<span class="empty_car">
				购物车还是空的,<a href="#/Shop"> 去逛逛              > </a>
			</span>
		</div>
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
			<tbody v-for="n in carItems">
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
								@click="removerCarItem(n.id)">
						<i class="el-icon-close"></i>
						</span>
					</td>
				</tr>
				
			</tbody>
		</table>
		<div class="settleAccounts">
				<ul>
					<li style="width: 400px;">
						已选择
						<span style="color: #d33a31">{{selectedItems}}</span>
						件商品
					</li>
					<li style="float: right">
						<router-link :to="{name: 'order', params: {id: user_id}}">
							<button class="settle_btn" @click="createOrderHandler">
							生成订单
						</button>
						</router-link>			
					</li>
				</ul>
			</div>
	</div>
</template>

<script>
	import aixos from 'axios'
	export default {
		data () {
			return {
				isEmpty: false,
				carItems: [],
				selectedItems: 0,
				totalPrice: 0,
				user_id: 0
			}
		},
		async created () {
			try {
				// 列出该用户的购物车清单
				const {data: session} = await axios.get('/api/session')
				const session_id = session.id
				this.user_id = session_id
				// 购物车明细
				const {data: carItems} = await axios.get(`/api/carItem/${session_id}`)
				this.carItems = carItems
				this.selectedItems = carItems.length
				let n = 0
				for (let i = 0; i < carItems.length; i++) {
					 n += carItems[i].settlement_price
				}
				this.totalPrice = n + 10
			} catch (err) {

			}	
		},
		methods: {
      		handleChange(value) {
        	console.log(value);
      		},
      		async removerCarItem (id) {	
      			const {data} = await axios.delete(`/api/carItem/${id}`)
      			// 删除之后,重新查询订单
      			const {data: session} = await axios.get('/api/session')
				const session_id = session.id
      			const {data: carItems} = await axios.get(`/api/carItem/${session_id}`)
				this.carItems = carItems
      		},
      		async createOrderHandler () {
      			const orderDate = this.carItems
      			const orderItems = []
      			for(let i = 0; i < orderDate.length; i++) {
      				const {data: orderItem} = await axios.post(`/api/order`, orderDate[i])
      				orderItems.push(orderItem)
      			}

      			// delete carItem
      			const {data: session} = await axios.get('/api/session')
				const session_id = session.id
      			const {data: carItems} = await axios.delete(`/api/carItemAll/${session_id}`)
      		}
    	}
	}
</script>

<style scoped>
	.container {
		width: 1000px;
		margin: 60px auto;
	}
	.car {
		position: relative;
	}
	.car i {
		position: absolute;
		left: 430px;
		top: 40px;
		font-size: 140px;
		color: #bfbfbf;
	}
	.car .empty_car {
		position: absolute;
		left: 400px;
		top: 200px;
		color: #666;
		font-size: 18px;
	}
	.car .empty_car a {
		color: #328ad4;
		text-decoration: none;
	}
	.car .empty_car a:hover {
		color: red;
	}
	.fullCar ul{
		list-style: none;	
		padding: 10px;
	}
	.fullCar ul li {
		float: left;
		margin-right: 20px;
		text-align: center;
	}
	#myCheck {
		display: none;
	}
	#myCheck + label {
		background-color: white;
		border: 1px solid #d3d3d3;
		width: 20px;
		height: 20px;
		display: inline-block;
		text-align: center;
		vertical-align: top;
		line-height: 20px;
	}
	#myCheck:checked + label {
		
	}
	#myCheck:checked + label:after {
		content: "\2714";
		color: #d33a31;
	}
	#myCheck1 {
		display: none;
	}
	#myCheck1 + label {
		background-color: white;
		border: 1px solid #d3d3d3;
		width: 20px;
		height: 20px;
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		line-height: 20px;
	}
	#myCheck1:checked + label {
		
	}
	#myCheck1:checked + label:after {
		content: "\2714";
		color: #d33a31;
	}
	.settleAccounts {
		margin-top: 200px;
		border-top: 1px solid #ccc;
		height: 60px;
	}
	.settleAccounts ul li {
		float: left;
		list-style: none;
		line-height: 60px;
	}
	.settle_btn {
		width: 160px;
		height: 50px;
    	line-height: 50px;
    	margin-left: 30px;
    	font-size: 16px;
    	background-color: #d33a31;
    	color: #fff;
    	text-align: center;
    	cursor: pointer;
    	margin: 0;
    	border: 0;
	}
	.carDetail ul li {
		line-height: 90px;
	}
</style> 