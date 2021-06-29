import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import {ClickOutside, Scroll, Resize, Touch, Intersect, Ripple} from "vuetify/lib/directives";


new Vue({
  mixins: [],
  directives: {ClickOutside, Scroll, Resize, Touch, Intersect, Ripple},
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
