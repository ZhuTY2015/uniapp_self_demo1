import Vue from 'vue'
import App from './App'

import 'static/common.css';

import request from 'api/request.js'
Vue.prototype.$request = request;

import popModal from './components/popModal.vue'
Vue.component('popModal',popModal)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
