<template>
  <div id="app">
    <div id="side-menu">
      <form @submit.prevent="search()">
        <div class="controle">
          <label for="searchField">Generic search</label>
          <input id="searchField" v-model="filter">
        </div>
        <div class="controle">
          <label for="searchTitle">Title</label>
          <input id="searchTitle" v-model="filterTitle">
        </div>
        <div class="controle">
          <input type="checkbox" name="whiteWine"  value="Vin blanc" v-model="whiteWine"/>White Wine
          <br>
          <input type="checkbox" name="redWine" value="Vin rouge" v-model="redWine"/>Red Wine
        </div>
        <button type="submit" >Search</button>
      </form>
    </div>
    <div id="wines-list">
      <li class="wines" v-for="wine of wines">
        <meu-painel :title="wine.title" :uri="wine.uri" :thumbnail="wine.raw.tpthumbnailuri" 
          :category="wine.raw.tpcategorie"/>
      </li>
    </div>
  </div>
</template>

<script>
import Painel from '../src/components/Painel.vue';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    'meu-painel' : Painel,
    VueSlider
  },
  data() {

    return {
      wines: [], 
      filter: '',
      filterTitle: '',
      sliderValue: '',
      whiteWine: '',
      redWine: ''
    }
  },
  created() {
    this.$http.post('http://localhost:8080/coveo/v1/coveo', " ")
      .then(res => res.json())
      .then(wines => this.wines = wines, err => console.log('erro ' + err));
  },
  methods: {
    search() {
      let mountedFilter = ' ';
      if(this.filter != '')
        mountedFilter = mountedFilter + this.filter;
      if(this.filterTitle != '')
        mountedFilter = mountedFilter + " @title=" + this.filterTitle;
      if(this.whiteWine == true && this.redWine == true) {
        mountedFilter = mountedFilter + " @tpcategorie=Vin rouge OR @tpcategorie=Vin blanc "
      } else if(this.whiteWine == true) {
        mountedFilter = mountedFilter + " @tpcategorie=Vin blanc "
      } else if(this.redWine == true) {
        mountedFilter = mountedFilter + " @tpcategorie=Vin rouge "
      }
      console.log(mountedFilter);     
      this.$http.post('http://localhost:8080/coveo/v1/coveo', mountedFilter)
      .then(res => res.json())
      .then(wines => this.wines = wines, err => console.log('erro ' + err));
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

#side-menu {
  float: left;
  width: 30%;
}

#wines-list {
  width: 70%;
  float: right;
}

.wines {
  list-style-type: none;
}

.controle {
  text-align: left;
  margin-bottom: 10px;
}
</style>