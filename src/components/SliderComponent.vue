<template>
  <section class="container-fluid mx-5">
    <h2>{{ sectionName }}</h2>
    <div class="slider-container">
      <button @click="prevSlide">Prev</button>
      <div class="slider">
        <div class="row">
          <div class="col-12 col-sm-4 col-md-3 col-lg-2 g-1"
            v-show="(!store.isFiltered || item.genre_ids.includes(store.filteredGenre[0].id))"
            v-for="item in visibleItems" :key="item.id">
            <CardComponent :path="item.poster_path" :title="item.title" :original="item.original_title || item.name"
              :language="item.original_language" :vote="getVote(item.vote_average)" :overview="item.overview"
              :genre="item.genre_ids" :id="item.id" :casting="item.cast" :type="sectionType" />
          </div>
        </div>
      </div>
      <button @click="nextSlide">Next</button>
    </div>
  </section>
</template>

<script>
import CardComponent from "./CardComponent.vue";
import { store } from "../assets/data/store";
export default {
  name: 'SliderComponent',
  components: {
    CardComponent,
  },
  props: {
    items: Array,
    sectionType: String,
    sectionName: String,
  },
  data() {
    return {
      store,
      currentSlide: 0,
      cardsPerSlide: 6,
    };
  }, methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    },
    getVote(vote) {
      const newVote = vote / 2;
      const rounded = Math.round(newVote * 2) / 2;
      return rounded;
    },
    // genreCheck(item) {
    //   if (store.genreID == "") {
    //     return item;
    //   } else {
    //     return item.genre_ids.includes(store.genreID);
    //   }
    // },
  },
  computed: {
    totalSlides() {
      return Math.ceil(this.items.length / this.cardsPerSlide);
    },
    visibleItems() {
      const startIndex = this.currentSlide * this.cardsPerSlide;
      const endIndex = startIndex + this.cardsPerSlide;
      return this.items.slice(startIndex, endIndex);
    },
  }
}
</script>
<style lang="scss" scoped>
@use "../assets/styles/partials/variables" as *;

h2 {
  color: $color_white;
}
</style>