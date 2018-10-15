<template>
	<div class="orderList">
    <div class="stateInfo">
      <p>状态值:</p>
      <span>0: 未收款</span>
      <span>1: 已收款</span>
      <span>2: 快递中</span>
      <span>3: 已收货</span>
      <span>4: 退货中</span>
      <span>5: 退货完成</span>
    </div>
		<el-table
    		ref="multipleTable"
    		:data="tableData3"
    		tooltip-effect="dark"
    		style="width: 100%"
    		@selection-change="handleSelectionChange">
    		<el-table-column
      			type="selection"
      			width="55">
    		</el-table-column>
    		<el-table-column
      			prop="id"
      			label="ID"
      			width="40">
    		</el-table-column>
    		<el-table-column
      			prop="item_name"
      			label="商品名"
      			width="120">
    		</el-table-column>
        <el-table-column
            prop="total_count"
            label="数量"
            width="60">
        </el-table-column>
        <el-table-column
            prop="settlement_price"
            label="付款"
            width="60">
        </el-table-column>
        <el-table-column
            prop="state"
            label="状态"
            width="60">
        </el-table-column>
        <el-table-column
            prop="user_id"
            label="购买人id"
            width="80">
        </el-table-column>
        <el-table-column
            prop="confignee_address"
            label="发货地址"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="confignee_name"
            label="收货人姓名"
            width="100">
        </el-table-column>
        <el-table-column
            prop="confignee_tel"
            label="收货人联系电话"
            show-overflow-tooltip>
        </el-table-column>
  		</el-table>
 		<div style="margin-top: 20px">
    		<el-button @click="stateChange">修改状态</el-button>
    		<el-button @click="toggleSelection()">取消选择</el-button>
  		</div>
	</div>
</template>

<script>
  import axios from 'axios'
	export default {
		data () {
			return {
				tableData3: []
			}
		},
    async created () {
        const {data} = await axios.get('/api/order')
        this.tableData3 = data
    },
		methods: {
			  toggleSelection(rows) {
        	  if (rows) {
          			rows.forEach(row => {
            			this.$refs.multipleTable.toggleRowSelection(row);
          			});
        		} else {
          			this.$refs.multipleTable.clearSelection();
        		}
     	 	},
        handleSelectionChange(val) {
       		  this.multipleSelection = val;
        },
        async stateChange() {
          const state_1 = window.prompt('状态值为', '')
          const form = {
            state: state_1
          }
          for (let i = 0; i < this.multipleSelection.length; i++) {
            const {data} = await axios.post(`/api/orderState/${this.multipleSelection[i].id}`, form)
          }
          const {data} = await axios.get('/api/order')
          this.tableData3 = data   
        }
		}
	}
</script>

<style scoped>
	.orderList {
      padding: 10px;
  }
  .stateInfo {
    padding: 20px;
  }
  .stateInfo p {
    margin: 0;
    color: cyan;
  }
  .stateInfo span {
    color: #999;
  }
</style> 