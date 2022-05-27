<template>
  <div>
    <div class="search-content">
      <!-- <search-bar @termChange="filteredTexts" class="search"></search-bar> -->
      <div>   
        <b-form-input @input="onInput" v-model="search" style="width: 350px;" placeholder="Pesquise o título de um texto"></b-form-input>   
      </div>
      <b-button v-show="!clicked" class="create-button" @click="createText" variant="dark">Criar Texto</b-button>
      <b-button v-show="clicked" class="create-button danger" @click="createText" variant="danger">Cancelar</b-button>
    </div>
    <form-box v-show="clicked"></form-box>
    <h3 v-show="!searching">Todos os textos:</h3>
    <h3 v-show="searching">Resultado da pesquisa:</h3>
    <p v-show="notFound" style="margin: 180px 0px 0px 200px">Nenhum texto encontrado!</p>
    <text-card v-for="text in texts" :key="text.id" :id="text.id" :title="text.title" :text="text.text"></text-card>
  </div>
</template>

<script>

import FormBox from '@/components/FormBox.vue';
import TextCard from '../components/TextCard.vue';

import axios from 'axios'

export default {
  name: 'App',
  components: { FormBox, TextCard},
  data() {
    return {
      clicked: false,
      texts: [],
      searchList: [],
      search: "",
      searching: false,
      notFound: false
    }
  },
  mounted() {
    this.getTexts();
  },
  methods: {
    onInput(e) {
        if(e == ""){
          this.getTexts();
          this.searching = !this.searching
        } else {
          this.searchFunction()
          this.searching = true
        }
    },
    createText() {
      this.clicked = !this.clicked;
      
    },
    async fetchData() {
      const res = await fetch("database.json", {mode: 'no-cors'});
      const val = await res.json();
      console.log(val)
      this.texts = val;
      this.searchList = val;
    },
    searchFunction() {
      let searchTerm = this.search
      var searchText = [] 
      this.searchList.forEach(function(post){
        if( post.title.toLowerCase().includes(searchTerm) ){
            searchText.push(post)
        }  
      })

      console.log(searchText)
      if (searchText == "") {
        this.notFound = true
      } else {
        this.notFound = false
      }

      this.texts = searchText
    },
    async getTexts() {
      let result = await axios.get("http://easiertext-api.herokuapp.com/texts")
      this.texts = result.data;
      this.searchList = result.data;
    }
  }
}
</script>

<style>
html {
  width: 600px;
  height: 500px;

}

h3 {
  margin-left: 15px;
}

.search-content{
  margin: 15px;
}

.create-button {
  position: absolute;
  top: 15px;
  left: 80%;
  margin: 0;
  
}

.search-button{
    position: absolute;
    top: 15px;
    left: 318px;
}

.danger {
  left: 83%;
}

</style>
