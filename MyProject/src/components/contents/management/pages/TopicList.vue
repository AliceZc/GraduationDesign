<template>
	<div class="topicList">
		<el-table
    		:data="topicList"
    		style="width: 100%;border: 1px solid #ebebeb;border-radius: 3px;padding: 24px"
    		>
    		 <el-table-column 
          		label="ID"
          		prop="id"
          		sortable
            	width="120">
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
              label="module"
              width="120">
              <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.module }}</span>
              </template>
          </el-table-column>

          <el-table-column 
              label="作者"
              width="120">
              <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.author}}</span>
              </template>
          </el-table-column>

          <el-table-column 
              label="发帖时间"
              width="120">
              <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
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
				  topicList: [{
          			
        		}],
        	centerDialogVisible: false
			}
		},
		async created () {
			 const {data} = await axios.get(`/api/topics`)
        for(let i = 0; i < data.topics.length; i++) {
          var date2 = new Date(data.topics[i].create_time)
          data.topics[i].create_time = date2.toLocaleDateString().trim()
          const id = data.topics[i].user_id
          const {data: user} = await axios.get(`/api/users/${id}`)
          data.topics[i].author = user.nickname
        }
       this.topicList = data.topics
		},
		methods: {
			 handleDelete (index, row) {
				    const id = row.id
            const isSure = window.confirm('Are you sure?')
            if (isSure === false) {
                return
            }
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