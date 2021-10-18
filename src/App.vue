<template>
<v-container fluid class="fill-height align-start">
  <v-row>
    <v-col cols="12">
      <monaco-editor class="wrapper"></monaco-editor>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import MonacoEditor from '@/components/MonacoEditor.vue'
export default {

  name: 'App',
  props: [''],
  components: {
    MonacoEditor
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
  ...mapActions('', []), 

  },
  beforeDestroy(){
  
  }
}
</script>

<style lang="scss" scoped>


.wrapper{
  height: 500px;
}

</style>