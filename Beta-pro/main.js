import Vue from 'vue'
import App from './App'
import uView from "uview-ui";

Vue.use(uView);

Vue.prototype.$webUrl = 'http://www.sunshine2020cc.cn:80'
Vue.prototype.$imageUrl = 'http://www.sunshine2020cc.cn/getimage/'
Vue.prototype.$htmlUrl = 'http://www.sunshine2020cc.cn/gethtml/'

App.mpType = 'app'

const app = new Vue({
	...App
})
// Vue.prototype添加全局变量
// Vue.component注册全局组件
// 配置全局URL


//挂载Vue实例
app.$mount()
