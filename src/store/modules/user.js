import { vuexfireMutations, firestoreAction, firestoreOptions } from 'vuexfire'

const user = {

    state: () => ({
      users: null
      
    }),

    getters: {
        allUsers: (state) => state.users,

    },

    actions: {

    },

    mutations: {
    
    },
    namespaced: true
}


export default user