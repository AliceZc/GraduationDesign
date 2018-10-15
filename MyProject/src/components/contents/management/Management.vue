<template>
    <div class="wrapper" style="background-color: #F0F0F0;">
        <div class="header">

        </div>
        <div class="sidebar">
            <el-menu class="sidebar-el-menu" default-active="1" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened>
                <a href="#/DashBoard">
                    <el-menu-item index="1">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>系统首页</span>
                        </template>
                    </el-menu-item>
                </a>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-more-outline"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item-group>
                        <a href="#/UserList">
                            <el-menu-item index="2-1">用户查询</el-menu-item>
                        </a>
                    </el-menu-item-group> 
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-star-off"></i>
                        <span>动漫管理</span>
                    </template>
                    <el-menu-item-group>     
                        <a href="#/CartoonList">
                            <el-menu-item index="3-1">动漫查询</el-menu-item>
                        </a>
                        <a href="#/CartoonUp">
                            <el-menu-item index="3-2">动漫上架</el-menu-item>
                        </a>
                    </el-menu-item-group> 
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-news"></i>
                        <span>资讯管理</span>
                    </template>
                    <el-menu-item-group>
                        <a href="#/NewsList">
                            <el-menu-item index="4-1">资讯查询</el-menu-item>
                        </a>
                        <a href="#/NewsUp">
                            <el-menu-item index="4-2">资讯上传</el-menu-item>
                        </a>
                    </el-menu-item-group> 
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-goods"></i>
                        <span>商城管理</span>
                    </template>
                    <el-menu-item-group>
                        <a href="#/OrderList">
                            <el-menu-item index="5-1">订单管理</el-menu-item>
                        </a>  
                        <a href="#/ProductUp">
                            <el-menu-item index="5-2">商品上传</el-menu-item>
                        </a>
                    </el-menu-item-group> 
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-tickets"></i>
                        <span>论坛管理</span>
                    </template>
                    <el-menu-item-group>
                        <a href="#/TopicList">
                            <el-menu-item index="6-1">帖子查询</el-menu-item>
                        </a>
                        <a href="#/TopicChart">
                            <el-menu-item index="6-2">图表分析</el-menu-item>
                        </a>
                    </el-menu-item-group> 
                </el-submenu>
                <a @click="loginOut">
                <el-menu-item index="7">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>
                                登出
                            </span>
                        </template>   
                    </el-menu-item>
                </a> 
            </el-menu>
        </div>
        <div class="contentBox">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive>
                        <transition name="fade"><router-view></router-view></transition>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import UsersList from '../management/pages/UsersList.vue'
    import DashBoard from '../management/pages/DashBoard.vue'
    import ProductUp from '../management/pages/ProductUp.vue'
    import CartoonList from '../management/pages/CartoonList.vue'
    import CartoonUp from '../management/pages/CartoonUp.vue'
    import NewsList from '../management/pages/NewsList.vue'
    import NewsUp from '../management/pages/NewsUp.vue'
    import TopicList from '../management/pages/TopicList.vue'
    import TopicChart from '../management/pages/TopicChart.vue'
    import OrderList from '../management/pages/OrderList.vue'


    export default {
        data(){
            return {
 
            }
        },
        components:{
            UsersList,
            DashBoard,
            ProductUp,
            CartoonList,
            CartoonUp,
            NewsList,
            NewsUp,
            TopicList,
            TopicChart,
            OrderList
        },
        created(){
           
        },          
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            async loginOut() {
                const n = window.confirm('是否退出')
                if(n) {
                    const {data} = await axios.delete('/api/adSession')
                    this.$router.push('/AdLogin')
                }
            }
        }
    }
</script>

<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
        background-color: #242f42;
    }
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 230px;
    }
    .sidebar > ul {
        height:100%;
    }
    a {
        text-decoration: none;
    }
    .contentBox {
        position: absolute;
        left: 230px;
        top: 70px;
        bottom:0;
        width: 1136px;
        min-height: 450px;
        background-color: #F0F0F0;
        overflow-y: auto;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
