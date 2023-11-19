<template>
  <HeaderComponent @clicked="getMoviesAndSeries" @filter="filterContent" />
  <main>
    <div v-if="((store.movieList.length == 0 && store.seriesList.length == 0) && (!movieEmpty && !serieEmpty))">
      <div
        v-if="(store.popularMovies.length > 0 && store.genreID === '') || (store.popularMoviesIDGenres.includes(store.genreID))">
        <SliderComponent :items="store.popularMovies" sectionName="Popular Movies" sectionType="movie" />
      </div>
      <div v-else class="container">
        <h2>No Popular Movies Found With The Selected Genre</h2>
      </div>
      <div
        v-if="(store.popularSeries.length > 0 && store.genreID === '') || (store.popularSeriesIDGenres.includes(store.genreID))">
        <SliderComponent :items="store.popularSeries" sectionName="Popular TV Series" sectionType="tv" />
      </div>
      <div v-else class="container">
        <h2>No Popular TV Series Found With The Selected Genre</h2>
      </div>
    </div>
    <div v-else-if="((store.movieList.length != 0 && store.seriesList.length != 0) && (!movieEmpty && !serieEmpty))">
      <div v-if="(store.movieList.length > 0 && store.genreID === '') || (store.moviesIDGenres.includes(store.genreID))">
        <SliderComponent :items="store.movieList" sectionName="Movies" sectionType="movie" />
      </div>
      <div v-else class="container">
        <h2>No Movies Found</h2>
      </div>
      <div v-if="(store.seriesList.length > 0 && store.genreID === '') || (store.seriesIDGenres.includes(store.genreID))">
        <SliderComponent :items="store.seriesList" sectionName="TV Series" sectionType="tv" />
      </div>
      <div v-else class="container">
        <h2>No TV Series Found</h2>
      </div>
    </div>
    <div v-else class="container">
      <h2>No Movie or TV Series Found</h2>
    </div>
  </main>
</template>


<script>
import { store } from "./assets/data/store";
import axios from 'axios';
import HeaderComponent from "./components/HeaderComponent.vue";
import SliderComponent from "./components/SliderComponent.vue";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    SliderComponent,
  },
  data() {
    return {
      store,
      movieEmpty: false,
      serieEmpty: false,
    };
  },
  methods: {
    getMoviesAndSeries() {
      const searchUrl = store.url + store.ep.search
      const movies = searchUrl + store.ep.movie;
      const series = searchUrl + store.ep.series;
      const params = store.params;
      console.log(params)

      Promise.all([axios.get(movies, { params: params }), axios.get(series, { params: params })]).then((results) => {
        this.movieEmpty = false;
        this.serieEmpty = false;

        if (results[0].data.results.length == 0) {
          this.movieEmpty = true;
        }
        if (results[1].data.results.length == 0) {
          this.serieEmpty = true;
        }

        store.movieList = results[0].data.results;
        store.seriesList = results[1].data.results;

        this.processSearch();

      })
      store.params.query = "";
    },
    getVote(vote) {
      const newVote = vote / 2;
      const rounded = Math.round(newVote * 2) / 2;
      return rounded;
    },
    getGenres() {
      const genreUrl = store.url + store.ep.genres
      const movieGenre = genreUrl + store.ep.movie + store.ep.list;
      const serieGenre = genreUrl + store.ep.series + store.ep.list;
      const apikey = store.apiOnly

      Promise.all([axios.get(movieGenre, { params: apikey }), axios.get(serieGenre, { params: apikey })])
        .then((results) => {
          const result0 = results[0].data.genres;
          const result1 = results[1].data.genres;

          for (let i = 0; i < result0.length; i++) {
            store.genresList.push(result0[i]);
          }
          for (let x = 0; x < result1.length; x++) {
            store.genresList.push(result1[x]);
          }
          store.genresList = store.genresList.filter(
            (genre, index, array) =>
              index === array.findIndex((x) => x.id === genre.id || x.name === genre.name)
          );
        })
    },
    getPopular() {
      const movies = store.url + store.ep.movie + store.ep.popular;
      const series = store.url + store.ep.series + store.ep.popular;
      const params = store.apiOnly;

      Promise.all([axios.get(movies, { params }), axios.get(series, { params })]).then((results) => {
        store.popularMovies = results[0].data.results;
        store.popularSeries = results[1].data.results;
        this.processPopular();
      })
    },
    filterContent() {
      store.filteredGenre = [];
      if (store.genreID != "") {
        store.isFiltered = true;
        store.filteredGenre = store.genresList.filter((el) => el.id == store.genreID)
      } else {
        store.isFiltered = false;
      }
    },
    extractGenres(sourceArray, destinationArray) {
      for (let i = 0; i < sourceArray.length; i++) {
        for (let a = 0; a < sourceArray[i].genre_ids.length; a++) {
          destinationArray.push(sourceArray[i].genre_ids[a])
        }
      }
    },
    processSearch() {
      store.moviesIDGenres = [];
      store.seriesIDGenres = [];
      this.extractGenres(store.movieList, store.moviesIDGenres);
      this.extractGenres(store.seriesList, store.seriesIDGenres);

    },
    processPopular() {
      store.popularMoviesIDGenres = [];
      store.popularSeriesIDGenres = [];
      this.extractGenres(store.popularMovies, store.popularMoviesIDGenres);
      this.extractGenres(store.popularSeries, store.popularSeriesIDGenres);
    }
  },
  created() {
    this.getPopular();
    this.getGenres();
  }
}
</script>

<style lang="scss" scoped>
@use "./assets/styles/partials/variables" as *;

main {
  margin-top: 5.5rem;
}

h1,
h2 {
  color: $color_white;
  margin: 1em 0;
}
</style>