<template>
	<div class="userList">
		 <el-table
    		:data="users"
    		style="width: 100%;border: 1px solid #ebebeb;border-radius: 3px;padding: 24px">
        <el-table-column 
          label="ID"
            width="180">
            <template slot-scope="scope">
              
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
        </el-table-column>
    		<el-table-column
     		 	label="昵称"
      			width="180">
      			<template slot-scope="scope">
        			
        			<span style="margin-left: 10px">{{ scope.row.nickname }}</span>
      			</template>
   		 	</el-table-column>
    		<el-table-column
      			label="email"
     			 width="180">
      			<template slot-scope="scope">
        			<el-popover trigger="hover" placement="top">
          			<p>姓名: {{ scope.row.username }}</p>
          			<p>住址: {{ scope.row.address }}</p>
                <p>爱好: {{ scope.row.hobbits }}</p>
          			<div slot="reference" class="name-wrapper">
            			<el-tag size="medium">{{ scope.row.email }}</el-tag>
          			</div>
       				</el-popover>
     			</template>
    		</el-table-column>
        <el-table-column
            label="创建时间"
           width="180">
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
        <span>已将该用户永久删除</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				users: [{
          			
        		}],
        centerDialogVisible: false
			}
		},
    async created () {
        const {data} = await axios.get('/api/users')     

        for(let i = 0; i < data.length; i++) {
          var date2 = new Date(data[i].create_time)
          data[i].create_time = date2.toLocaleDateString().trim()
        }
        this.users = data
    },
		methods: {
      	async handleDelete(index, row) {
            const id = row.id
            const isSure = window.confirm('Are you sure?')
            if (isSure === false) {
                return
            }
            await axios.delete(`/api/user/${id}`)
            const {data} = await axios.get('/api/users')     

           for(let i = 0; i < data.length; i++) {
            var date2 = new Date(data[i].create_time)
            data[i].create_time = date2.toLocaleDateString().trim()
          }
          this.users = data
          this.centerDialogVisible = true
     		}
		}
	}
</script>

<style scoped>
	.userList {
		padding: 20px 40px;
	}
</style> 