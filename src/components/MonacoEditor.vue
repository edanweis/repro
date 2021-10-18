<template>
  
    <div id="firepad" style="height: 500px"></div>
  
  
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

import {TextOperation} from '@/mixins/text-operation.js';

import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

import { fromMonaco } from "@hackerrank/firepad";
import Firepad from "@hackerrank/firepad";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

export default {

  name: 'MonacoEditor',
  props: [],
  mixins: [],
  components: {
    // MonacoEditor
  },
  data () {
    return {
        revisions: null,  
        firepad: null,
        editor: null
    }
  },
  asyncComputed: {
    
  },
  async mounted(){


    const theme1 = {"base":"vs-dark","inherit":true,"rules":[{"background":"272822","token":""},{"foreground":"75715e","token":"comment"},{"foreground":"e6db74","token":"string"},{"foreground":"ae81ff","token":"constant.numeric"},{"foreground":"ae81ff","token":"constant.language"},{"foreground":"ae81ff","token":"constant.character"},{"foreground":"ae81ff","token":"constant.other"},{"foreground":"f92672","token":"keyword"},{"foreground":"f92672","token":"storage"},{"foreground":"66d9ef","fontStyle":"italic","token":"storage.type"},{"foreground":"a6e22e","fontStyle":"underline","token":"entity.name.class"},{"foreground":"a6e22e","fontStyle":"italic underline","token":"entity.other.inherited-class"},{"foreground":"a6e22e","token":"entity.name.function"},{"foreground":"fd971f","fontStyle":"italic","token":"variable.parameter"},{"foreground":"f92672","token":"entity.name.tag"},{"foreground":"a6e22e","token":"entity.other.attribute-name"},{"foreground":"66d9ef","token":"support.function"},{"foreground":"66d9ef","token":"support.constant"},{"foreground":"66d9ef","fontStyle":"italic","token":"support.type"},{"foreground":"66d9ef","fontStyle":"italic","token":"support.class"},{"foreground":"f8f8f0","background":"f92672","token":"invalid"},{"foreground":"f8f8f0","background":"ae81ff","token":"invalid.deprecated"},{"foreground":"cfcfc2","token":"meta.structure.dictionary.json string.quoted.double.json"},{"foreground":"75715e","token":"meta.diff"},{"foreground":"75715e","token":"meta.diff.header"},{"foreground":"f92672","token":"markup.deleted"},{"foreground":"a6e22e","token":"markup.inserted"},{"foreground":"e6db74","token":"markup.changed"},{"foreground":"ae81ffa0","token":"constant.numeric.line-number.find-in-files - match"},{"foreground":"e6db74","token":"entity.name.filename.find-in-files"}],"colors":{"editor.foreground":"#F8F8F2","editor.background":"#272822","editor.selectionBackground":"#49483E","editor.lineHighlightBackground":"#3E3D32","editorCursor.foreground":"#F8F8F0","editorWhitespace.foreground":"#3B3A32","editorIndentGuide.activeBackground":"#9D550FB0","editor.selectionHighlightBorder":"#222218"}}


    const theme2 = {
    base: 'vs',
    inherit: true,
    rules: [{ background: 'FFFFFF' }],
        colors: {
            'editor.foreground': '#000000',
            'editor.background': '#00000000',
            'editorCursor.foreground': '#8B0000',
            'editor.lineHighlightBackground': '#00000005',
            'editor.selectionBackground': '#00000030',
            'editor.inactiveSelectionBackground': '#88000005'
        }
    }

    monaco.editor.defineTheme('myCustomTheme', theme2)

    monaco.languages.registerCompletionItemProvider('plaintext', {
        provideCompletionItems: (model, position) => {
          const wordBeforePosition = model.getWordUntilPosition({
            lineNumber: position.lineNumber,
            column: position.column - 1,
          });

          const wordUntilPosition = model.getWordUntilPosition(position);
          if (wordBeforePosition.word.trim() === '' ||  wordUntilPosition.word.trim() === '') {
            const keywords = this.completionTriggerKeywords || [];

            const suggestions = keywords.map(id => ({
              label: id.label,
              kind: id.kind,
              description: id.description,
              documentation: id.description,
              insertText: id.insertText,
              detail: id.description,
              insertTextRules: id.insertTextRules,
              range: {
                startLineNumber: position.lineNumber,
                startColumn: wordUntilPosition.startColumn,
                endLineNumber: position.lineNumber,
                endColumn: wordUntilPosition.endColumn - 1,
              },
            }));
            return {suggestions};
          }
        },
      });


    this.editor = monaco.editor.create(document.getElementById('firepad'), {
      value: 'loading...',
      wordBasedSuggestions: true,
      automaticLayout: true,
      language: 'plaintext',
      lineNumbers: "off",
      minimap: {
        enabled: false
      },
      wordWrap: 'on',
      overviewRulerLanes: 0,
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,
      scrollbar: {
       vertical: 'hidden'
     },
     scrollBeyondLastLine: false,
     fontFamily: "Roboto",
     fontSize: 18,
     fontLigatures: true,
     theme: "myCustomTheme",
     trimAutoWhitespace: false,
     lineNumbers: 'off',
     glyphMargin: false,
     folding: false,
     // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
     lineDecorationsWidth: 0,
     lineNumbersMinChars: 0

   });

    this.firepad = fromMonaco(this.$rtdb.ref().child('firepad-dev'), this.editor, {
      userId: 'F946F5DE-9DEA-44AF-83FE-B0E9D47593BA',
      userName: 'John',
      theme: "myCustomTheme",
      
    });

    

    

  },
  created(){

  },
  computed:{
  

  },
  watch:{

    async timestamp(val, oldVal){
      // console.log(val)
      let text = await this.fetchRevisions(this.$rtdb.ref().child('firepad-dev'), revisionInfo => {
        // console.log(revisionInfo)
         const timestamp = val // eg: "1601406184335"
         const text = textForRevision(timestamp, revisionInfo)
         console.log(text)
         return text
       })
      if(text){
        // console.log(text)
        // this.firepad.setText(text)
      }
      
    }

  },
  methods:{
  ...mapMutations('', []), 
  ...mapActions('', []), 


  async fetchRevisions(firebaseRef, callback){
    var self = this
    await firebaseRef.child('history').once("value", function (snapshot) {
      self.revisions = snapshot.val()
      // console.log(self.revisions)
      var revisionsByTimestamp = {}

      for (let r of Object.values(self.revisions)){
        console.log(r)
        var d = new TextOperation()
        const operation = d.fromJSON(r.o)
        // console.log(operation)
        revisionsByTimestamp[`${r.t}`] = operation
      }
      
      return revisionsByTimestamp
    })
  },

  textForRevision(revision, revisions){
    var d = new TextOperation()
    console.log(d)
    const keys = Object.keys(this.revisions).sort()
    for (var key of keys) {
      const operation = this.revisions[key]
      d = d.compose(operation)
      if (key === revision) {
        break
      }
    }
    return d.ops.length ? d.toJSON().slice(-1).pop() : null

  },



  },
  beforeDestroy(){
    monaco.editor.getModels().forEach(model => model.dispose());
    this.firepad.dispose();

  }
}
</script>

<style lang="scss" scoped>

#firepad {
  height: 100%;
  width: 100%;
}

</style>