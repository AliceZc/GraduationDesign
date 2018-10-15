<template>
	<div id="app">
		<Header></Header>
        <router-view></router-view>
	</div>
</template>

<script>
	import Header from './components/Header.vue'
 	import Login from './components/contents/user/Login.vue'
 	import Zhuce from './components/contents/user/Zhuce.vue'
 	import Home from './components/contents/Home.vue'
 	import CreateTopic from './components/contents/forum/CreateTopic.vue'
 	import TopicDetail from './components/contents/forum/TopicDetail.vue'
 	import TopicEdit from './components/contents/forum/TopicEdit.vue'
 	import Inforsetting from './components/contents/user/Inforsetting.vue'
 	import News from './components/contents/news/News.vue'
 	import Cartoon from './components/contents/cartoon/Cartoon.vue'
 	import CartoonDetail from './components/contents/cartoon/CartoonDetail.vue'
 	import NewsDetail from './components/contents/news/NewsDetail.vue'
 	import Shop from './components/contents/shop/Shop.vue'
 	import ShopDetail from './components/contents/shop/ShopDetail.vue'
 	import Order from './components/contents/shop/Order.vue'
 	import OrderDetail from './components/contents/shop/OrderDetail.vue'
 	import ShopCar from './components/contents/shop/ShopCar.vue'
 	import AnimeExpo from './components/contents/animeExpo/AnimeExpo.vue'
 	import SettleAccount from './components/contents/shop/SettleAccount.vue'
 	import Newforum from './components/contents/forum/Newforum.vue'
 	import ForumBlock from './components/contents/forum/ForumBlock.vue'
 	import AdLogin from './components/contents/AdLogin.vue'
 	import Management from './components/contents/management/Management.vue'

	export default {
		data () {

		},
		components: {
			Header,
			Login,
			Zhuce,
			Home,
			CreateTopic,
			TopicDetail,
			TopicEdit,
			Inforsetting,
			News,
			Cartoon,
			CartoonDetail,
			NewsDetail,
			Shop,
			ShopDetail,
			Order,
			OrderDetail,
			ShopCar,
			AnimeExpo,
			SettleAccount,
			Newforum,
			ForumBlock,
			AdLogin,
			Management
		}
	}
</script>

<style>
	.slide-fade-enter-active {
  		transition: all .3s ease;
	}
	.slide-fade-leave-active {
  		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  		transform: translateX(10px);
  		opacity: 0;
	}
</style>