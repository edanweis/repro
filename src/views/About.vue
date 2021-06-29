<template>
<v-container fluid class="fill-height container"> 
	About
</v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {

  name: 'About',
  props: [''],
  directives: {
  	
  },
  components: {

  },
  data () {
    return {

    }
  },
  mounted(){


  },
  created(){


  },
  computed:{
	...mapGetters('', []),


  },
  watch:{

  },
  methods:{
	...mapMutations('', []), 
	...mapActions('', [])
  },

  beforeDestroy(){
  }
}
</script>

<style lang="scss" scoped>

</style>