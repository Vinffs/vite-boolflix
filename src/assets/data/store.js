import { reactive } from "vue";

export const store = reactive({
  url: "https://api.themoviedb.org/3",
  ep: {
    search: "/search/",
    genres: "/genre/",
    list: "/list",
    credits: "/credits",
    movie: "/movie",
    series: "/tv",
  },
  params: {
    api_key: "c86e86575fec70888484dcb2a1c2fd09",
    query: "",
  },
  apiOnly: {
    api_key: "c86e86575fec70888484dcb2a1c2fd09",
  },
  imagePath: "https://image.tmdb.org/t/p/w300",
  imageDefault: "/images/default.jpg",

  movieList: [],
  seriesList: [],
  genresList: [],
  filteredGenre: [],
  genreID: "",
});
