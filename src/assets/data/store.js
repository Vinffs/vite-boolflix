import { reactive } from "vue";

export const store = reactive({
  apiUrl: "https://api.themoviedb.org/3/search/",
  endPoint: {
    movie: "movie",
    series: "tv",
  },
  params: {
    api_key: "c86e86575fec70888484dcb2a1c2fd09",
    query: "",
  },
  imagePath: "https://image.tmdb.org/t/p/w300",
  imageDefault: "/images/default.jpg",

  genresPath: "https://api.themoviedb.org/3/genre/",
  genresMovies: "movie/list",
  genresSeries: "tv/list",

  movieList: [],
  seriesList: [],
  genresList: [],
  filteredGenre: [],
  genreID: "",
});
