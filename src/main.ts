import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ajax from './axios/index'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

let VideoPlayer = require('vue-video-player')

Vue.use(VideoPlayer)
Vue.config.productionTip = false
Vue.prototype.$ajax = ajax
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
