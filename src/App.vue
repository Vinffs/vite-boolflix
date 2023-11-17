<template>
  <HeaderComponent @clicked="getMoviesAndSeries" @filter="filterContent()" />
  <main>
    <div class="container" v-if="(store.movieList.length == 0 && store.seriesList.length == 0)">
      <h1>Search for Movies and TV Series</h1>
    </div>
    <div v-else>
      <section id="movie" class="container">
        <h2>Movies</h2>
        <div class="row">
          <div v-show="(!isFiltered || movie.genre_ids.includes(store.filteredGenre[0].id))"
            class="col-12 col-md-4 col-lg-3" v-for="(movie, index) in store.movieList" :key="movie.id">
            <Card :path="movie.poster_path" :title="movie.title" :original="movie.original_title"
              :language="movie.original_language" :vote="getVote(movie.vote_average)" :overview="movie.overview"
              :genre="movie.genre_ids" :id="movie.id" :cast="movie.cast" :type="'movie'" />
          </div>
        </div>
      </section>
      <section id="series" class="container">
        <h2>TV Series</h2>
        <div class="row">
          <div v-show="(!isFiltered || serie.genre_ids.includes(store.filteredGenre[0].id))"
            class="col-12 col-md-4 col-lg-3" v-for="(serie, index) in store.seriesList" :key="serie.id">
            <Card :path="serie.poster_path" :title="serie.name" :original="serie.original_name"
              :language="serie.original_language" :vote="getVote(serie.vote_average)" :overview="serie.overview"
              :genre="serie.genre_ids" :id="serie.id" :cast="serie.cast" :type="'tv'" />
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
      isFiltered: false,
    };
  },
  methods: {
    getMoviesAndSeries() {
      const searchUrl = this.store.url + this.store.ep.search
      const movies = searchUrl + this.store.ep.movie;
      const series = searchUrl + this.store.ep.series;
      const params = this.store.params;

      Promise.all([axios.get(movies, { params: params }), axios.get(series, { params: params })]).then((results) => {
        this.store.movieList = results[0].data.results;
        this.store.seriesList = results[1].data.results;
      })
      this.store.params.query = "";
    },
    getVote(vote) {
      const newVote = vote / 2;
      const rounded = Math.round(newVote * 2) / 2;
      return rounded;
    },
    getGenres() {
      const genreUrl = this.store.url + this.store.ep.genres
      const movieGenre = genreUrl + this.store.ep.movie + this.store.ep.list;
      const serieGenre = genreUrl + this.store.ep.series + this.store.ep.list;
      const apikey = this.store.apiOnly

      Promise.all([axios.get(movieGenre, { params: apikey }), axios.get(serieGenre, { params: apikey })])
        .then((results) => {
          const result0 = results[0].data.genres;
          const result1 = results[1].data.genres;

          for (let i = 0; i < result0.length; i++) {
            this.store.genresList.push(result0[i]);
          }
          for (let x = 0; x < result1.length; x++) {
            this.store.genresList.push(result1[x]);
          }
          this.store.genresList = this.store.genresList.filter(
            (genre, index, array) =>
              index === array.findIndex((x) => x.id === genre.id || x.name === genre.name)
          );
        })
    },
    filterContent() {
      this.store.filteredGenre = [];
      if (store.genreID != "") {
        this.isFiltered = true;
        this.store.filteredGenre = this.store.genresList.filter((el) => el.id == store.genreID)
      } else {
        this.isFiltered = false;
      }
    },
  },

  created() {
    this.getGenres();
  }


}
</script>

<style lang="scss" scoped>
@use "./assets/styles/partials/variables" as *;

main {
  margin-top: 5em;
}

h1,
h2 {
  color: $color_white;
}
</style>