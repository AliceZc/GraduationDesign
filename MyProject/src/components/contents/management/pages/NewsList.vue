<template>
	<div class="newsList">
		<el-table
    		:data="newsList"
    		style="width: 100%;border: 1px solid #ebebeb;border-radius: 3px;padding: 24px">
        	<el-table-column 
          	label="ID"
            width="100">
            	<template slot-scope="scope"> 
              		<span style="margin-left: 10px">{{ scope.row.id }}</span>
            	</template>
        	</el-table-column>

        	<el-table-column 
          	label="Title"
            width="400">
            	<template slot-scope="scope"> 
              		<span style="margin-left: 10px">{{ scope.row.title }}</span>
            	</template>
        	</el-table-column>

        	<el-table-column 
          	label="Time"
            width="120">
            	<template slot-scope="scope"> 
              		<span style="margin-left: 10px">{{ scope.row.time }}</span>
            	</template>
        	</el-table-column>

        	<el-table-column 
          	label="Hits"
            width="120">
            	<template slot-scope="scope"> 
              		<span style="margin-left: 10px">{{ scope.row.hits }}</span>
            	</template>
        	</el-table-column>

    		<el-table-column label="操作">
      			<template slot-scope="scope">
        			<el-button
         				size="mini"
          				type="danger"
          				@click="handleDelete(scope.$index, scope.row)">删除</el-button>
      			</template>
    		</el-table-column>
  		</el-table>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>已将该帖子永久删除</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
	</div></template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				newsList: [{}],
				centerDialogVisible : false
			}
		},
		async created () {
			const {data} = await axios.get('/api/news')
			for(let i = 0; i < data.news.length; i++) {
          		const date2 = new Date(data.news[i].time)
          		data.news[i].time = date2.toLocaleDateString().trim()
        	}
			this.newsList = data.news
		},
		methods: {
      		async handleDelete(index, row) {
            	const id = row.id
            	const isSure = window.confirm('Are you sure?')
            	if (isSure === false) {
                	return
           		}
            	await axios.delete(`/api/news/${id}`)     
           		const {data} = await axios.get('/api/news')

				for(let i = 0; i < data.news.length; i++) {
          			const date2 = new Date(data.news[i].time)
          			data.news[i].time = date2.toLocaleDateString().trim()
        		}
				this.newsList = data.news
          		this.centerDialogVisible = true
     		}
     	}
	}
</script>

<style scoped>
	.newsList {
		padding: 20px 40px;
	}
</style> 