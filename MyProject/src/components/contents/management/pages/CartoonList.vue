<template>
	<div class="cartoonList">
		<el-table
    		:data="cartoons"
    		style="width: 100%;border: 1px solid #ebebeb;border-radius: 3px;padding: 24px"
    		>
    		 <el-table-column 
          		label="ID"
          		prop="id"
          		sortable
            	width="180">
            	<template slot-scope="scope">
              		<span style="margin-left: 10px">{{ scope.row.id }}</span>
            	</template>
        	</el-table-column>
        	<el-table-column 
          		label="Title"
            	width="250">
            	<template slot-scope="scope">
              		<span style="margin-left: 10px">{{ scope.row.title }}</span>
            	</template>
        	</el-table-column>
        	<el-table-column 
          		label="开播年份"
            	width="150"
            	sortable
            	prop="air_year">
            	<template slot-scope="scope">
              		<span style="margin-left: 10px">{{ scope.row.air_year }}</span>
            	</template>
        	</el-table-column>
        	<el-table-column 
          		label="开播月份"
            	width="150"
            	sortable
            	prop="air_month">
            	<template slot-scope="scope">
              		<span style="margin-left: 10px">{{ scope.row.air_month }}</span>
            	</template>
        	</el-table-column>
        	<el-table-column 
          		label="每周播出时间"
            	width="150"
            	>
            	<template slot-scope="scope">
              		<span style="margin-left: 10px">{{ scope.row.play_time }}</span>
            	</template>
        	</el-table-column>
        	<el-table-column label="操作">
      			<template slot-scope="scope">
        			<el-button
         				size="mini"
          				type="danger"
          				@click="handleDelete(scope.$index, scope.row)">下架</el-button>
      			</template>
    		</el-table-column>
    	</el-table>
    	<el-dialog
  			title="提示"
  			:visible.sync="centerDialogVisible"
  			width="30%"
  			center>
  			<span>已将该作品下架处理</span>
  			<span slot="footer" class="dialog-footer">
    			<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				  cartoons: [{
          			
        		}],
        	centerDialogVisible: false
			}
		},
		async created () {
			const {data} = await axios.get('/api/cartoons')
			this.cartoons = data.cartoons
      console.log(this.cartoons)
		},
		methods: {
			async handleDelete (index, row) {
				const id = row.id
            	const isSure = window.confirm('Are you sure?')
            	if (isSure === false) {
                	return
            	}
            	await axios.delete(`/api/cartoon/${id}`)
            	const {data} = await axios.get('/api/cartoons')
            	this.cartoons = data.cartoons
            	this.centerDialogVisible = true
			}
		}
	}
</script>

<style scoped>
	.cartoonList {
		padding: 20px 40px;
	}
</style> 