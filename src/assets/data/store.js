import { reactive } from "vue";

export const store = reactive({
  apiUrl: "https://api.themoviedb.org/3/search/",
  endPoint: {
    movie: "movie",
    series: "tv",
  },
  params: {
    api_key: "c86e86575fec70888484dcb2a1c2fd09",
    query: "a",
  },
  error: "",
  loading: true,
  movieList: [],
  seriesList: [],
});
