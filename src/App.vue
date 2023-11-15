<template>
  <HeaderComponent @clicked="getMoviesAndSeries" />
  <main>
    <div class="container" v-if="(!store.movieList.length && !store.seriesList.length)">
      <h1>Search for Movies and TV Series</h1>
    </div>
    <div v-else>
      <section id="movie" class="container">
        <h2>Movies</h2>
        <div class="row">
          <div class="col-12 col-md-4 col-lg-3" v-for="(movie, index) in store.movieList" :key="movie.id">
            {{ movie.title }}
          </div>
        </div>
      </section>
      <section id="series" class="container">
        <h2>TV Series</h2>
        <div class="row">
          <div class="col-12 col-md-4 col-lg-3" v-for="(serie, index) in store.seriesList" :key="serie.id">
            {{ serie.name }}
          </div>
        </div>
      </section>
    </div>

  </main>
</template>

<script>
import { store } from "./assets/data/store";
import axios from 'axios';
import HeaderComponent from "./components/HeaderComponent.vue";
export default {
  name: 'App',
  components: {
    HeaderComponent,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getMoviesAndSeries() {
      const urlMovies = this.store.apiUrl + this.store.endPoint.movie;
      const urlSeries = this.store.apiUrl + this.store.endPoint.series;
      const params = this.store.params;

      Promise.all([axios.get(urlMovies, { params: params }), axios.get(urlSeries, { params: params })]).then((results) => {
        console.log(this.store.movieList, this.store.seriesList)
        this.store.movieList = results[0].data.results;
        this.store.seriesList = results[1].data.results;
        console.log(this.store.movieList, this.store.seriesList)
      })
    }
  },
  created() {
  }


}
</script>

<style lang="scss" scoped></style>