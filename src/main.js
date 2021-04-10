import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import './plugins/element.js'
/* 导入全局样式表 */
import './assets/css/normalize.css'
/* 修改Element默认样式 */
import './assets/css/element.css'
/* 导入公用样式表 */
import './assets/css/public.css'

Vue.config.productionTip = false
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8080/forum/'
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.prototype.$message = Message

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})