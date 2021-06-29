import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js';


Vue.use(Vuex)

import { vuexfireMutations } from 'vuexfire'


export default new Vuex.Store({
    modules: {
        user
    },
    mutations: {
    	...vuexfireMutations,
    }
});