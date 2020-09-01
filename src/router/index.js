import Vue from 'vue'
import Router from 'vue-router'
import product from './product'
// import product from './product'
import home from "../components/home/home";
import cake from "../components/cake/cake";
import xiangQing from "../components/xiangQing/xiangQing";
import vip from "../components/vip/vip";
import MY_order from "../components/myorder/MY_order";
import order_info from "../components/myorder/order_info";
import yinhang from "../components/yinhang/yinhang";
import newhuodong from "../components/newhuodong/newhuodong";
import hongB from "../components/myown/hongB/hongB";
import coupon from "../components/myown/coupon/coupon";
import yuE from "../components/myown/yuE/yuE";
import snake from "../components/snake/snake";
import dingdan from "../components/dingdan/dingdan";
import cartDetails from "../components/goodsCart/cartDetails";
import enterLog from "../components/vip/enterLog";
import  enterscene from "../components/cake/scene_flavor"
import perInfo from "../components/myown/perinfo/perInfo";
import shouye from '../components/home/home'
import hbpage from '../components/gethb/gethb'
import point from "../components/myown/point/point";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home,

    },
    {
      path: '/cake',
      name: 'cake',
      component: cake,
    },
    {
      path: '/vip',
      name: 'vip',
      component: vip,
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      },
    },
    {
      path: '/MY_order',
      name: 'MY_order',
      component: MY_order
    },
    {
      path: '/order_info',
      name: 'order_info',
      component: order_info
    },
    {
      path: '/xiangQing',
      name: 'xiangQing',
      component: xiangQing
    },
    {
      path: '/yinhang',
      name: 'yinhang',
      component: yinhang
    },
    {
      path: '/newhuodong',
      name: 'newhuodong',
      component: newhuodong
    },
    {
      path: '/hongB',
      name: 'hongB',
      component: hongB
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: coupon
    },
    {
      path: '/yuE',
      name: 'yuE',
      component: yuE
    },
    {
      path: '/snake',
      name: 'snake',
      component: snake
    },
    {
      path: '/dingdan',
      name: 'dingdan',
      component: dingdan
    },
    {
      path: '/cartDetails',
      name: 'cartDetails',
      component: cartDetails
    },
    {
      path: '/enterLog',
      name: 'enterLog',
      component: enterLog,

    },
    {
      path: '/enterscene',
      name: 'enterscene',
      component: enterscene,

    },
    {
      path: '/perInfo',
      name: 'perInfo',
      component: perInfo,

    },{
      path: '/shouye',
      name: 'shouye',
      component: shouye,

    },
    {
      path: '/hbpage',
      name: 'hbpage',
      component: hbpage,

    },
    {
      path: '/point',
      name: 'point',
      component: point,

    },
    ...product,
  ]
})
