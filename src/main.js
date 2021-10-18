import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import {ClickOutside, Scroll, Resize, Touch, Intersect, Ripple} from "vuetify/lib/directives";

import firebase from 'firebase/app'
import "firebase/auth";	
import "firebase/functions";
import 'firebase/storage';

const db = firebase.initializeApp({
	  apiKey: "AIzaSyCDZKFK2sy7-CzDURgKt1IbjdERhcHYJX8",
	  authDomain: "repro-80f48.firebaseapp.com",
	  databaseURL: "https://repro-80f48-default-rtdb.firebaseio.com",
	  projectId: "repro-80f48",
	  storageBucket: "repro-80f48.appspot.com",
	  messagingSenderId: "186212988506",
	  appId: "1:186212988506:web:96f11fcc011c3cd63b4a63"
})


Vue.prototype.$firebase = firebase

Vue.prototype.$rtdb = db.database()



new Vue({
  mixins: [],
  directives: {ClickOutside, Scroll, Resize, Touch, Intersect, Ripple},
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
