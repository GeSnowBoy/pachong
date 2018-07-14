import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Videolist from './views/VideoList.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/videolist',
            name: 'videolist',
            component: Videolist
        }
    ]
})
