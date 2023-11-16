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
            <Card :path="movie.poster_path" :title="movie.title" :original="movie.original_title"
              :language="movie.original_language" :vote="getVote(movie.vote_average)" :overview="movie.overview" />
          </div>
        </div>
      </section>
      <section id="series" class="container">
        <h2>TV Series</h2>
        <div class="row">
          <div class="col-12 col-md-4 col-lg-3" v-for="(serie, index) in store.seriesList" :key="serie.id">
            <Card :path="serie.poster_path" :title="serie.name" :original="serie.original_name"
              :language="serie.original_language" :vote="getVote(serie.vote_average)" :overview="serie.overview" />
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
import Card from "./components/Card.vue";
export default {
  name: 'App',
  components: {
    HeaderComponent,
    Card,
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
        this.store.movieList = results[0].data.results;
        this.store.seriesList = results[1].data.results;
        console.log(this.store.movieList, this.store.seriesList)
      })
      this.store.params.query = "";
    },
    getVote(vote) {
      const newVote = vote / 2;
      const rounded = Math.round(newVote * 2) / 2;
      return rounded;
    }
  },
  created() {
  }


}
</script>

<style lang="scss" scoped>
@use "./assets/styles/partials/variables" as *;

main {
  margin-top: 5em;
}

h2 {
  color: $color_white;
}
</style>