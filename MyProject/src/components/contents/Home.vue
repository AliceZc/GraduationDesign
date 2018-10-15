<template>
  <div class="box">   
      <div width="1366px" style="overflow: hidden">
         <img src="../../images/bc/4.png">
      </div>
	   <div class="container"> 
		<div class="photo">
			<!-- 相册 -->
			<el-carousel indicator-position="inside" height="400px">
          <el-carousel-item v-for="item in images" :key="item">
            <img :src="item.src" width="1000px">
          </el-carousel-item>
        </el-carousel>
		</div>
    
		<div class="cartoonTime">
			<!-- 新番时间表 -->
      <el-card shadow="always" style="border: 1px solid #DADADA;
    box-shadow: 0 0 8px rgba(68,68,68,.8);">
			<el-tabs v-model="activeName" @tab-click="handleClick">
    			<el-tab-pane label="周一" name="1">
              <router-link v-for="item in monday"
              :to="{name: 'cartoon-detail', params: {id: item.id}}" :key="item.id" style="text-decoration: none;color: black;margin-right: 40px">
                  <img :src="item.img_src"
                    style="border-radius: 60px;vertical-align: middle;border: 2px solid cyan" width="120px" height="120px">
                  <span style="vertical-align: middle;color: cyan;">
                      {{item.title}}
                  </span>
              </router-link>
          </el-tab-pane>
    			<el-tab-pane label="周二" name="2">
              <router-link v-for="item in tuesday"
              :to="{name: 'cartoon-detail', params: {id: item.id}}" :key="item.id" style="text-decoration: none;color: black;margin-right: 40px">
                  <img :src="item.img_src"
                    style="border-radius: 60px;vertical-align: middle;border: 2px solid cyan" width="120px" height="120px">
                  <span style="vertical-align: middle;color: cyan">
                      {{item.title}}
                  </span>
              </router-link>
              </router-link>
          </el-tab-pane>
    			<el-tab-pane label="周三" name="3">
              <router-link v-for="item in wednesday"
              :to="{name: 'cartoon-detail', params: {id: item.id}}" :key="item.id" style="text-decoration: none;color: black;margin-right: 40px">
                  <img :src="item.img_src"
                    style="border-radius: 60px;vertical-align: middle;border: 2px solid cyan" width="120px" height="120px">
                  <span style="vertical-align: middle;color: cyan">
                      {{item.title}}
                  </span>
              </router-link>
          </el-tab-pane>
    			<el-tab-pane label="周四" name="4">
              <router-link v-for="item in thursday"
              :to="{name: 'cartoon-detail', params: {id: item.id}}" :key="item.id" style="text-decoration: none;color: black;margin-right: 40px">
                  <img :src="item.img_src"
                    style="border-radius: 60px;vertical-align: middle;border: 2px solid cyan" width="120px" height="120px">
                  <span style="vertical-align: middle;color: cyan">
                      {{item.title}}
                  </span>
              </router-link>
          </el-tab-pane>
    			<el-tab-pane label="周五" name="5">
                <router-link v-for="item in firday"
              :to="{name: 'cartoon-detail', params: {id: item.id}}" :key="item.id" style="text-decoration: none;color: black;margin-right: 40px">
                  <img :src="item.img_src"
                    style="border-radius: 60px;vertical-align: middle;border: 2px solid cyan" width="120px" height="120px">
                  <span style="vertical-align: middle;color: cyan">
                      {{item.title}}
                  </span>
              </router-link> 
          </el-tab-pane>
    			<el-tab-pane label="周六" name="6">
                <router-link v-for="item in saturday"
              :to="{name: 'cartoon-detail', params: {id: item.id}}" :key="item.id" style="text-decoration: none;color: black;margin-right: 40px">
                  <img :src="item.img_src"
                    style="border-radius: 60px;vertical-align: middle;border: 2px solid cyan" width="120px" height="120px">
                  <span style="vertical-align: middle;color: cyan">
                      {{item.title}}
                  </span>
              </router-link>
          </el-tab-pane>
    			<el-tab-pane label="周日" name="0">
                <router-link v-for="item in sunday"
              :to="{name: 'cartoon-detail', params: {id: item.id}}" :key="item.id" style="text-decoration: none;color: black;margin-right: 40px">
                  <img :src="item.img_src"
                    style="border-radius: 60px;vertical-align: middle;border: 2px solid cyan" width="120px" height="120px">
                  <span style="vertical-align: middle;color: cyan">
                      {{item.title}}
                  </span>
              </router-link>
          </el-tab-pane>
  			</el-tabs>
      </el-card>
		</div>
    <div class="enter"> 
        <el-card shadow="always" style="border: 1px solid #DADADA;
    box-shadow: 0 0 8px rgba(68,68,68,.8);">
            <h2>
              最新动漫
              <a href="#/Cartoon" style="font-size: 10px;margin-left: 40px;color: red; text-decoration:none">
                更多
              </a>
            </h2>
            <ul>
              <li v-for="item in cartoons" style="padding: 20px;">
                  <router-link :to="{name: 'cartoon-detail', params: {id: item.id}}" :key="item.id" > 
                     <img :src="item.img_src"
                    style="border-radius: 12px;vertical-align: middle;" width="160px" class="rotateImg">
                  </router-link>  
              </li>
            </ul>
        </el-card>
    </div>

    <div class="animeExpo">
      <el-card shadow="always" style="border: 1px solid #DADADA;
    box-shadow: 0 0 8px rgba(68,68,68,.8);">
          <h2>
              漫展信息
              <a href="#" style="font-size: 10px;margin-left: 40px;color: red; text-decoration:none">
                更多
              </a>
          </h2>
          <ul>
             <li v-for="item in animeExpos">
                  <img :src="item.img" alt="" width="150" height="204">
                  <div class="anime_right">
                      <p style="font-size: 16px;color: #F56C6C">{{ item.title }}</p>
                      <p style="font-size:12px;position:absolute;top:70px;left:0;
                      color: #666">
                        <i class="el-icon-location-outline" style="color: #f29b22;font-size: 20px">
                        </i>
                        {{ item.address }}
                      </p>
                      <p style="font-size: 12px;position:absolute;top:110px;left:0;color: #666">
                        <i class="el-icon-time" style="color: #f29b22;font-size: 20px">
                        </i>
                         {{ item.time }}
                      </p>
                      <p style="color: #f29b22; font-size: 20px;position:absolute;top:150px;left:30px;">
                         ￥{{ item.price }}
                      </p>
                  </div>
             </li>
          </ul>
      </el-card>
    </div> 
	   </div>
  </div>
</template>

<script>
	import axios from 'axios'
	export default {
		data () {
			return {
				activeName: '',
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        firday: [],
        saturday: [],
        sunday: [],
        images: [
          {
            src: require("../../images/4.png")
          },
          {
            src: require("../../images/5.png")
          },
          {
            src: require("../../images/6.png")
          },
          {
            src: require("../../images/7.png")
          }
        ],
        animeExpos: [],
        cartoons: []
			}
		},
    async created () {
       const today = new Date()
       const todayWeek = today.getDay()
       this.activeName = todayWeek.toString()
       var {data} = await axios.get(`/api/cartoons`)
       this.monday = data.cartoons.filter(item => {
          if (item.play_time == '周一') {
            return item
          }
       })
       this.tuesday = data.cartoons.filter(item => {
          if (item.play_time == '周二') {
            return item
          }
       })
       this.wednesday = data.cartoons.filter(item => {
          if (item.play_time == '周三') {
            return item
          }
       })
       this.thursday = data.cartoons.filter(item => {
          if (item.play_time == '周四') {
            return item
          }
       })
       this.firday = data.cartoons.filter(item => {
          if (item.play_time == '周五') {
            return item
          }
       })
       this.saturday = data.cartoons.filter(item => {
          if (item.play_time == '周六') {
            return item
          }
       })
       this.sunday = data.cartoons.filter(item => {
          if (item.play_time == '周日') {
            return item
          }
       })
       const {data:animeExpos} = await axios.get('/api/animeExpo')
       const n = []
       for (let i = 0; i < 4; i++) {
          n.push(animeExpos.animeExpos[i])
       }
       this.animeExpos = n
       const {data: cartoons} = await axios.get('/api/cartoons')
       const m = []
       for (let i = 0; i < 8; i++) {
          m.push(cartoons.cartoons[i])
       }
       this.cartoons = m
       console.log(m)
    },
		methods: {
			handleClick(tab, event) {
        		
      		}
    	}
	}
</script>

<style scoped>
  .box {
    
  }
	.container {
		width: 1000px;
		margin: 0 auto;
		margin-top: 60px;
    background-color: #fff;
	}
	.photo {
	   margin-top: 60px;
	}
	.cartoonTime {
		margin: 0 auto;
    margin-top: 60px;
	}
  .enter {
    margin-top: 60px;
    margin-bottom: 60px;
  }
  .enter ul{
    list-style: none;
    overflow: hidden;
    padding: 0;
  }
  .enter ul li {
    float: left;
/*    width: 130px;
    height: 200px*/

    margin-right: 38px;
  }
  .animeExpo ul {
    padding: 0;
    overflow: hidden;
  }
  .animeExpo ul li {
     list-style: none;
     float: left;
     margin: 0 50px 40px 0;
     border: 1px solid #dedede;
     border-radius: 6px;
  }
  .animeExpo .anime_right {
    display: inline-block;
    width: 260px;
    height: 200px;
    vertical-align: top;
    position: relative;
    padding: 5px;
  }
</style> 