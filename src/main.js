import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import axios from 'axios'
Vue.prototype.$http = axios.create({
    timeout: 10000
});
/*Vue.prototype.$http = axios*/
/*import 'element-ui/lib/theme-default/index.css'*/
Vue.use(VueRouter)
Vue.use(ElementUI)


//引入组件
import App from './App.vue';
import purCenter from './components/purCenter.vue';
import uiEle from './components/uiEle.vue';
import cart from './components/cart.vue';
import orderManage from './components/orderManage.vue';
import change from './components/change.vue';
import orderCheck from './components/orderCheck.vue';
import record from './components/record.vue';
import inquiry from './components/inquiry.vue';
import judge from './components/judge.vue';
import user from './components/user.vue';

//定义路由
const routes = [
 { path: '/',component:App},
 { path: '/purCenter',component:purCenter},
 { path: '/uiEle', component: uiEle },
 { path: '/cart', component: cart },
 { path: '/orderManage', component: orderManage },
 { path: '/change', component: change },
 { path: '/orderCheck', component: orderCheck },
 { path: '/record', component: record },
 { path: '/inquiry', component: inquiry },
 { path: '/judge', component: judge },
 { path: '/user', component: user }
 ]
const router=new VueRouter({
routes
});

//创建axios实例
var instance = axios.create({
  baseURL: 'http://www.syxsoa.com:9600/service/org/user/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

/*new Vue({
  el: '#app',
  render: h => h(App)
})*/

//创建和挂载根实例。通过 router 配置参数注入路由，从而让整个应用都有路由功能
new Vue({
el:"#app",
data:{
	  seen: true,
	  seen2:true
	},
/*mounted() {
   axios.get("www.syxsoa.com:8080/api/org/member/list")
   .then(response => {
   	this.results = response.data.results;
   	console.log(response);
   })
 },*/
	
methods:{
	toggle(){
		this.seen = this.seen? false : true;
	},
	toggle2(){
		this.seen2 = this.seen2? false : true;
	}
},
router,
axios
});
export default {
  // 用户注册
  userRegister(data) {
    return instance.post('/api/register', data)
  },
  // 用户登录
  UserLogin(data) {
    return instance.post('/api/login', data)
  },
  // 获取用户
  getUser() {
    return instance.get('/api/user')
  },
  // 删除用户
  delUser(data) {
    return instance.post('/api/delUser', data)
  }
}
/*this.$http({
        method: 'GET',
        url: ''
    }).then((res) => {
        if (res.code === 200) {
       } else {
            _this.$alert(res.message, '错误', {
                confirmButtonText: '确定',
                type: 'error'
            });
        }
    }).catch((err) => {
        console.log('====>err', err);
    });*/
