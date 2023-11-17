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
            <Card @mouseover="addCastMovie(movie)" :path="movie.poster_path" :title="movie.title"
              :original="movie.original_title" :language="movie.original_language" :vote="getVote(movie.vote_average)"
              :overview="movie.overview" :genre="movie.genre_ids" :id="movie.id" :cast="movie.cast" />
          </div>
        </div>
      </section>
      <section id="series" class="container">
        <h2>TV Series</h2>
        <div class="row">
          <div v-show="(!isFiltered || serie.genre_ids.includes(store.filteredGenre[0].id))"
            class="col-12 col-md-4 col-lg-3" v-for="(serie, index) in store.seriesList" :key="serie.id">
            <Card @mouseover="addCastSerie(serie)" :path="serie.poster_path" :title="serie.name"
              :original="serie.original_name" :language="serie.original_language" :vote="getVote(serie.vote_average)"
              :overview="serie.overview" :genre="serie.genre_ids" :id="serie.id" :cast="serie.cast" />
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
    },
    getGenres() {
      const movieGenreUrl = this.store.genresPath + this.store.genresMovies;
      const serieGenreUrl = this.store.genresPath + this.store.genresSeries;
      const apikey = `?api_key=${this.store.params.api_key}`

      Promise.all([axios.get(movieGenreUrl + apikey), axios.get(serieGenreUrl + apikey)])
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
          console.log(this.store.genresList);
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
    addCastMovie(movie) {
      if (movie.cast && movie.cast.length > 0) {
        return
      }
      const movieCredits = "https://api.themoviedb.org/3/movie/" + movie.id + "/credits";
      const params = {
        api_key: this.store.params.api_key
      }

      movie.cast = [];
      axios.get(movieCredits, { params }).then((results) => {
        for (let i = 0; i < 5; i++) {
          if (results.data.cast[i]) {
            movie.cast.push(results.data.cast[i].name)
          }
        }
      })
    },
    addCastSerie(serie) {
      if (serie.cast && serie.cast.length > 0) {
        return
      }
      const serieCredits = "https://api.themoviedb.org/3/tv/" + serie.id + "/credits";
      const params = {
        api_key: this.store.params.api_key
      }

      serie.cast = [];
      axios.get(serieCredits, { params }).then((results) => {
        for (let i = 0; i < 5; i++) {
          if (results.data.cast[i]) {
            serie.cast.push(results.data.cast[i].name)
          }
        }
      })
    }

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