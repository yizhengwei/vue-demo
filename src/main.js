import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import axios from 'axios'

axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios

Vue.config.productionTip = false

import ElementUI from 'element-ui';
Vue.use(ElementUI);
Vue.prototype.$message = ElementUI.Message;
Vue.prototype.$confirm = ElementUI.MessageBox.confirm;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
