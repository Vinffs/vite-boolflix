<template>
  <section class="container p-0">
    <h2 class="px-1 my-5">{{ sectionName }}</h2>
    <div class="row g-0 flex-nowrap overflow-hidden overflow-x-auto">
      <div class="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2 px-1"
        v-show="(!store.isFiltered || item.genre_ids.includes(store.filteredGenre[0].id))" v-for="item in items"
        :key="item.id">
        <CardComponent :path="item.poster_path" :title="item.title" :original="item.original_title || item.name"
          :language="item.original_language" :vote="getVote(item.vote_average)" :overview="item.overview"
          :genre="item.genre_ids" :id="item.id" :casting="item.cast" :type="sectionType" />
      </div>
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
    };
  }, methods: {

    getVote(vote) {
      const newVote = vote / 2;
      const rounded = Math.round(newVote * 2) / 2;
      return rounded;
    },

  },
}
</script>
<style lang="scss" scoped>
@use "../assets/styles/partials/variables" as *;

h2 {
  color: $color_white;
}
</style>