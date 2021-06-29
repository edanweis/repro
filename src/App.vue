<template>
<v-container fluid class="fill-height">
  <v-row>
    <v-col cols="12">
      <span class="injected">orange</span>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {

  name: 'App',
  props: [''],
  components: {},
  data () {
    return {
      color: 'orange'
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
  ...mapActions('', []), 

  },
  beforeDestroy(){
  
  }
}
</script>

<style lang="scss" vars scoped>

.injected{
  // color: 'orange';
  color: v-bind(color);
}

</style>