<template>
    <div class="DashBoard">
        <el-row :gutter="12">
            <el-col :span="8">
                <el-card shadow="always">
                    <div class="user-info">
                        <img src="../../../../images/bc/3.jpg" height="655" width="1000" class="user-avator" alt="">
                        <div class="user-info-cont">
                            <div style="font-size: 30px;color: #222">Admin</div>
                            <div>超级管理员</div>
                        </div>
                    </div>
                        <div class="user-info-list">上次登录时间：<span>{{adUser.loginIn_time}}</span></div>
                        <div class="user-info-list">上次退出时间：<span>{{adUser.loginOut_time}}</span></div>
                </el-card>
                <br>
                <el-card shadow="always">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>
                            Vue
                    <el-progress :percentage="57.2" color="#42b983"></el-progress>
                            JavaScript
                    <el-progress :percentage="29.8" color="#f1e05a"></el-progress>
                            CSS
                    <el-progress :percentage="11.9"></el-progress>
                            HTML
                    <el-progress :percentage="1.1" color="#f56c6c"></el-progress>
                 </el-card>
            </el-col>
            <el-col :span="15">
                <el-card shadow="always">
                    <div class="todo">
                        <div class="header">
                            <el-input
                                placeholder="What needs to be done?"
                                @keydown.enter.native = "add"
                                v-model="input1"
                                clearable>       
                            </el-input>
                        </div>
                        <ol style="padding-left: 20px" class="todoList">
                            <li style="font-size: 20px;" v-for="(item,index) in todos" :key="item.id">
                                <label>{{item.title}}</label>
                                <i style="float: right" class="el-icon-close" @click="remove(index,$event)">
                                </i>
                            </li>
                        </ol>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                input1: '',
                todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
                adUser: {}       
            }
        },
        async created () {
            const {data} = await axios.get('/api/adUser')
            const n = new Date(data[0].loginIn_time)
            data[0].loginIn_time = n.toLocaleString()
            const m = new Date(data[0].loginOut_time)
            data[0].loginOut_time = m.toLocaleString()
            this.adUser = data[0]
        },
        methods: {
            add () {
                const todoText = this.input1.trim();
                if (!todoText.length) {
                    return
                }
                const lastTodo = this.todos[this.todos.length - 1];
                const id = lastTodo ? lastTodo.id + 1 : 1;
                const time = new Date();
                console.log(time.getDay())
                this.todos.push({
                    id,
                    title: todoText
                })
                window.localStorage.setItem('todos',JSON.stringify(this.todos))
                this.input1 = '';
            },
            remove (index,e) {
                this.todos.splice(index, 1);
                window.localStorage.setItem('todos',JSON.stringify(this.todos))
            }
        }
    }

</script>


<style scoped>
    .DashBoard {
        padding: 20px;
    }
    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }
    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }
    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }
    .header input {
        width: 200px;
        height: 40px;
    }
    .todoList li {
        margin-bottom: 6px;
    }
    .todoList li i:hover{
        color: rgb(175, 47, 47);
    }
    .todoList li label {
        color: #20a0ff;
        font-weight: 700;
    }
    .todoList li label:hover {
        color: #FF40C9;
    }
</style>
