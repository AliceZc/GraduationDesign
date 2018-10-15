import VueRouter from 'vue-router'
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
import UserList from './components/contents/management/pages/UsersList.vue'
import DashBoard from './components/contents/management/pages/DashBoard.vue'
import ProductUp from './components/contents/management/pages/ProductUp.vue'
import CartoonList from './components/contents/management/pages/CartoonList.vue'
import CartoonUp from './components/contents/management/pages/CartoonUp.vue'
import NewsList from './components/contents/management/pages/NewsList.vue'
import NewsUp from './components/contents/management/pages/NewsUp.vue'
import TopicList from './components/contents/management/pages/TopicList.vue'
import TopicChart from './components/contents/management/pages/TopicChart.vue'
import OrderList from './components/contents/management/pages/OrderList.vue'

export default new VueRouter({
	routes: [
          {
               path: '/Login',
               component: Login
          },
          {
               path: '/Zhuce',
               component: Zhuce
          },
          {
               path: '/',
               component: Home
          },
          {
               path: '/CreateTopic',
               component: CreateTopic
          },
          {    
               name: 'topic-detail',
               path: '/TopicDetail/:id',
               component: TopicDetail
          },
          {    
               name: 'topic-edit',
               path: '/TopicEdit/:id',
               component: TopicEdit
          },
          {
               path: '/Inforsetting',
               component: Inforsetting
          },
          {
               path: '/News',
               component: News
          }
          ,
          {
               path: '/Cartoon',
               component: Cartoon
          },
          {
               name: 'cartoon-detail',
               path: '/CartoonDetail/:id',
               component: CartoonDetail
          },
          {
               name: 'news-detail',
               path: '/NewsDetail/:id',
               component: NewsDetail
          },
          {
               path: '/Shop',
               component: Shop
          },
          {
               name: 'shop-detail',
               path: '/ShopDetail/:id',
               component: ShopDetail
          },
          {    
               name: 'order',
               path: '/Order/:id',
               component: Order
          },
          {
               path: '/OrderDetail',
               component: OrderDetail
          },
          {
               path: '/ShopCar',
               component: ShopCar
          },
          {
               path: '/AnimeExpo',
               component: AnimeExpo
          },
          {
               name: 'settke-account',
               path: '/SettleAccount',
               component: SettleAccount
          },
          {
               path: '/Newforum',
               component: Newforum
          },
          {
               name: 'forum-block',
               path: '/ForumBlock/:module',
               component: ForumBlock
          },
          {
               path: '/AdLogin',
               component: AdLogin
          },
          {
               path: '/Management',
               component: Management,
               redirect: '/DashBoard',
               children: [
                    {
                         path: '/DashBoard',
                         component: DashBoard
                    },
                    {
                         path: '/UserList',
                         component: UserList
                    },
                    {
                         path: '/ProductUp',
                         component: ProductUp
                    },
                    {
                         path: '/CartoonList',
                         component: CartoonList
                    },
                    {
                         path: '/CartoonUp',
                         component: CartoonUp
                    },
                    {
                         path: '/NewsList',
                         component: NewsList
                    },
                    {
                         path: '/NewsUp',
                         component: NewsUp
                    },
                    {
                         path: '/TopicList',
                         component: TopicList
                    },
                    {
                         path: '/TopicChart',
                         component: TopicChart
                    },
                    {
                         path: '/OrderList',
                         component: OrderList
                    }
               ]
          }
	]
})