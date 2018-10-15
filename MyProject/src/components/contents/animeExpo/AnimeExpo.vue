<template>
  <div class="box">
	   <div class="contain">
		
		<ul>
			<li v-for="item in animeExpos1">
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
	   </div>
  </div>
</template>

<script>
	export default {
		data () {
			return {
				animeExpos1: [],
        animeExpos: []
			}
		},
		async created () {
			const {data: animeExpos} = await axios.get('/api/animeExpo')
			this.animeExpos1 = animeExpos.animeExpos.slice(0,6)
      this.animeExpos = animeExpos
		},
		methods: {
	
		}
	}
</script>

<style scoped>
  .box {
    padding-top: 60px;
    background-image: url('../../../images/bc/AnimeExpo2.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }
	.contain {
		width: 1000px;
		margin: 0 auto;
	}
	.contain ul {
    	padding: 0;
    	overflow: hidden;
      margin: 0;
  	}
  	.contain ul li {
     	list-style: none;
     	float: left;
      margin: 20px;
     	border: 1px solid #dedede;
     	border-radius: 6px;
      background-color: #fff;
  	}
  	.contain .anime_right {
    	display: inline-block;
    	width: 260px;
    	height: 200px;
    	vertical-align: top;
    	position: relative;
    	padding: 0 5px;
  	}	
</style> 