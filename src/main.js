import Vue from 'vue'
import VuejsDialog from 'vuejs-dialog';
import VueTailwind from 'vue-tailwind'
import App from './App.vue'
import router from './router'

import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './css/main.css'
import './css/normalize.css'
//import './css/webflow.css'
//import './css/0xbtc.webflow.css'
//import './css/github-markdown.css'

Vue.config.productionTip = false
Vue.use(VuejsDialog);
Vue.use(VueTailwind)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
