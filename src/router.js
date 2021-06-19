import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Home from './pages/Home';
import Favorites from './pages/Favorites';

const router =  new Router({
    mode: 'history',
    routes: [
    {
        path:'/',
        component:Home
    },
    {
        path:'/favorites',
        component:Favorites
    },   
 ]
})

export default router;