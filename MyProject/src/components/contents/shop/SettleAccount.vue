<template>
	<div class="settle">
		<h4>请选择支付方式</h4>
  		<ul id = "fa_ul">
    		<li v-for="(item,key) in imgs" @click="select($event)">
    			<img :src="item">
    		</li>
  		</ul>
  		<div>
    		<span style="font-weight: 700">总金额</span>
    		<span style="color: red;font-weight: 1000">{{money}}</span>
  		</div>
  		<div>
    		<button class="btn" @click="settleHandler">确认支付</button>
  		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import $ from 'jquery'
	export default {
		data () {
			return {
				money: 0,
				orderItems: [],
				id: 0,
				imgs: [
					require("../../../images/account/ps_abc.png"),
    				require("../../../images/account/ps_alipay.png"),
    				require("../../../images/account/ps_bjb.png"),
    				require("../../../images/account/ps_boc.png"),
    				require("../../../images/account/ps_ccb.png"),
    				require("../../../images/account/ps_cebb.png"),
    				require("../../../images/account/ps_cib.png"),
   	 				require("../../../images/account/ps_citic.png"),
    				require("../../../images/account/ps_cmb.png"),
    				require("../../../images/account/ps_cmbc.png"),
    				require("../../../images/account/ps_comm.png"),
    				require("../../../images/account/ps_czb.png"),
    				require("../../../images/account/ps_gdb.png"),
    				require("../../../images/account/ps_hfb.png"),
    				require("../../../images/account/ps_hxb.png"),
    				require("../../../images/account/ps_icbc.png"),
    				require("../../../images/account/ps_njcb.png"),
    				require("../../../images/account/ps_psbc.png"),
    				require("../../../images/account/ps_spa.png"),
    				require("../../../images/account/ps_spdb.png"),
    				require("../../../images/account/ps_tenpay.png"),
    				require("../../../images/account/ps_unionpay.png")
				]
			}
		},
		async created ()  {
			const {data: session} = await axios.get('/api/session')
			const session_id = session.id
			this.id = session_id
			const {data: orderItem} = await axios.get(`/api/order/${session_id}`)
			this.orderItems = orderItem
			let m = 0
			for(let i = 0; i < this.orderItems.length; i++) {
				console.log(this.orderItems[i])
				m += this.orderItems[i].settlement_price
			}
			this.money = m
		},
		methods: {
			async settleHandler () {
				for(let i = 0; i < this.orderItems.length; i++) {
					// 0 未付款
					// 1 已付款
					// 2 已接收
					const form = {
						state: 1
					}
					const order_id = this.orderItems[i].id
					const {data} = await axios.post(`/api/orderState/${order_id}`, form)
				}
				alert('has settled')
			},
			select (e) {
				const n = document.getElementById("fa_ul")
				const m = n.querySelectorAll("img")
				for(let i = 0; i < m.length; i++) {
					m[i].style="5px solid white"
				}
				e.target.style.border = '5px solid #409EFF'
			}
		}
	}
</script>

<style scoped>
	.settle {
		width: 1100px;
		margin: 0 auto;
		margin-top: 120px;
	}
	ul {
      list-style: none;
      width: 1000px;
      padding: 20px;
      box-shadow: 0 0 4px rgba(0,0,0,0.3);
    }
    li {
      display: inline-block;
      margin: 0 20px;
    }
    #fa_ul li img {
      border:5px solid white;
    }
    #fa_ul li img:hover {
      border: 5px solid #409EFF;
    }
    .btn {
      margin-top: 30px;
      padding: 10px;
      background-color: #d33a31;
      border: 0;
      color: #fff;
      font-size: 18px;
      margin-right: 10px;
      outline: none;
    }
</style> 