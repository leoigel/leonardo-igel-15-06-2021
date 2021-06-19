import Vue from 'vue';
import App from './App.vue';
import router from './router';
import "./axios/index";
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import store from './store/store';
import Header from './components/Header';
import './assets/main.css';

Vue.component('Header',Header);
Vue.use(VueMaterial);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
