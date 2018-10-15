<template>
	<div class="container">
		<!-- 订单管理界面 -->
		<h3>订单管理</h3>
		<hr>
		<div class="orderInfo">
			<div class="nav">
				<span class="n_1">宝贝</span>
				<span class="n_group">单价</span>
				<span class="n_group">数量</span>
				<span class="n_group">状态</span>
				<span class="n_group">实付款</span>
				<span class="n_group">操作</span>
			</div>
			<div class="orderList" v-for="(item, index) in orderList">
				<div class="order_nav">
					<span>{{ item.create_time }}</span>
					<span>订单号:{{ item.id }}</span>
				</div>
				<div class="order_detail">
					<img :src="item.item_img">
					<span class="od_1">{{ item.item_name }}</span>
					<span class="od_2">￥{{ item.item_price }}</span>
					<span class="od_3">{{ item.total_count }}</span>
					<span class="od_4">{{item.state}}</span>
					<span class="od_5">￥{{ item.settlement_price }}</span>
					<span class="od_6">
						<button @click="goToSettle(index)">去付款</button>
						<button @click="getGood(item.id,index)">确认收货</button>
						<button @click="backGood(item.id,index)">退货</button>
					</span>
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
				orderList: []
			}
		},
		async created () {
			const {data: sessionUser} = await axios.get('/api/session')
			const {data: orderList } = await axios.get(`/api/order/${sessionUser.id}`)
			for(let i = 0; i < orderList.length; i++) {
				switch (orderList[i].state) {
					case 0:
						orderList[i].state = '未付款'
						break;
					case 1:
						orderList[i].state = '已付款'
						break;
					case 2:
						orderList[i].state = '快递中'
						break;
					case 3:
						orderList[i].state = '已收货'
						break;
					case 4:
						orderList[i].state = '退货中'
						break;
					case 5:
						orderList[i].state = '退货完成'
						break;
				}
			}
			this.orderList = orderList
		},
		methods: {
			async deleteHandler (id) {
				const order_id = id
				await axios.delete(`/api/order/${order_id}`)
				const {data: sessionUser} = await axios.get('/api/session')
				const {data: orderList } = await axios.get(`/api/order/${sessionUser.id}`)
				this.orderList = orderList
			},
			goToSettle (index) {
				if (this.orderList[index].state === '未付款') {
					this.$router.push('/SettleAccount')
				}
			},
			async getGood (id,index) {
				if (this.orderList[index].state === '快递中') {
					const form = {
            			state: 3
          			}
          			const {data} = await axios.post(`/api/orderState/${id}`, form)
          			const {data: sessionUser} = await axios.get('/api/session')
			const {data: orderList } = await axios.get(`/api/order/${sessionUser.id}`)
			for(let i = 0; i < orderList.length; i++) {
				switch (orderList[i].state) {
					case 0:
						orderList[i].state = '未付款'
						break;
					case 1:
						orderList[i].state = '已付款'
						break;
					case 2:
						orderList[i].state = '快递中'
						break;
					case 3:
						orderList[i].state = '已收货'
						break;
					case 4:
						orderList[i].state = '退货中'
						break;
					case 5:
						orderList[i].state = '退货完成'
						break;
				}
			}
			this.orderList = orderList
				}
			},
			async backGood (id,index) {
				if (this.orderList[index].state !== '未付款' || this.orderList[index].state !== '退货完成') {
					const form = {
            			state: 4
          			}
          			const {data} = await axios.post(`/api/orderState/${id}`, form)
          			const {data: sessionUser} = await axios.get('/api/session')
			const {data: orderList } = await axios.get(`/api/order/${sessionUser.id}`)
			for(let i = 0; i < orderList.length; i++) {
				switch (orderList[i].state) {
					case 0:
						orderList[i].state = '未付款'
						break;
					case 1:
						orderList[i].state = '已付款'
						break;
					case 2:
						orderList[i].state = '快递中'
						break;
					case 3:
						orderList[i].state = '已收货'
						break;
					case 4:
						orderList[i].state = '退货中'
						break;
					case 5:
						orderList[i].state = '退货完成'
						break;
				}
			}
			this.orderList = orderList
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
	.container .orderInfo {

	}
	.container .orderInfo .nav {
		background-color: #F5F5F5;
		border: 1px solid #F5F5F5;
		padding: 10px 0;
	}
	.orderInfo .nav .n_1 {
		margin: 0 200px;
	}
	.orderInfo .nav .n_group {
		margin-right: 85px;
	}
	.orderList {
		margin-top: 20px;
	}
	.orderList .order_nav {
		background-color: #F5F5F5;
		border: 1px solid #F5F5F5;
		padding: 10px 20px;
		position: relative;
	}
	.orderList .order_nav span {
		margin: 0 30px;
	}
	.orderList .order_nav .a_1 {
		position: absolute;
		right: 20px;
		color: black;
		font-size: 20px;
	}
	.orderList .order_nav .a_2 {
		position: absolute;
		right: 50px;
		color: black;
		font-size: 20px;
	}
	.orderList .order_detail {
		position: relative;
	}
	.orderList .order_detail img {
		width: 80px;
		height: 80px;
		margin-left: 40px;
		margin-top: 20px;
	}
	.orderList .order_detail .od_1 {
		position: absolute;
		width: 250px;
		left: 160px;
		top: 40px;
	}
	.orderList .order_detail .od_2 {
		position: absolute;
		left: 427px;
		top: 40px;
	}
	.orderList .order_detail .od_3 {
		position: absolute;
		left: 568px;
		top: 40px;		
	}
	.orderList .order_detail .od_4 {
		position: absolute;
		left: 680px;
		top: 40px;			
	}
	.orderList .order_detail .od_5 {
		position: absolute;
		left: 805px;
		top: 40px;		
	}
	.orderList .order_detail .od_6 {
		position: absolute;
		left: 920px;
		top: 10px;		
	}
</style> 