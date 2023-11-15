<template>
  <main>
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
  </main>
</template>

<script>
import { store } from "./assets/data/store";
import axios from 'axios';
export default {
  name: 'App',
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
        this.store.movieList = results[0].data.results;
        this.store.seriesList = results[1].data.results;
      })
    }
  },
  created() {
  }


}
</script>

<style lang="scss" scoped></style>