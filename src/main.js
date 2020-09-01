// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import $ from 'jquery'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/font/iconfont.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)



Vue.use(elementUI);
Vue.use(VueAwesomeSwiper, /* { default options with global component } */);
Vue.config.productionTip = false;
Vue.prototype.$axios=axios;
Vue.prototype.$host="http://172.16.2.44:2666/";
// Vue.prototype.$host="http://192.168.0.108:2666/";
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    router.beforeEach((to, from, next) => {
      var that = this;

      if(to.meta.requireAuth ){
        that.$axios.get('/api/getU.do')
          .then(resp=>{
            if (resp.data!=''&&resp.data!=undefined){
                that.$router.push({path: '/',params:{userid:resp.data}})
                next()
            }else {
                that.$router.push({path: '/enterLog'})
                next()
            }
          })
        // if(JSON.parse(localStorage.getItem("login"))==null){
        //   console.log('没有登录')
        //   that.$router.push({path: '/',query: {redirect: to.fullPath}})
        //   next()
        // } else {
        //
        //   that.$router.push({path: to.fullPath})
        //   next()
        // }
      }
      else {

        next();
      }
    });

  }
})


