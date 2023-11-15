<template>
  <div class="card">
    <img :src="(path != null ? (store.imagePath + path) : store.imageDefault)" class="card-img-top" :alt="title">
    <div class="card-body">
      <div class="card-title">
        <span class="fw-bold fs-6">Title: </span>
        {{ title }}
      </div>
      <div class="card-text">
        <div>
          <span class="fw-bold fs-6">Original: </span>
          {{ original }}
        </div>
        <div class="flag">
          <span class="fw-bold fs-6">Language: </span>
          <img :src="`/images/flags/${language}.svg`" :alt="language">
        </div>
        <div>
          <span class="fw-bold fs-6">Vote: </span>
          <i :class="getStars(vote, star)" v-for="star in stars"></i>
          {{ vote }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../assets/data/store";
export default {
  name: 'Card',
  props: {
    path: String,
    title: String,
    original: String,
    language: String,
    vote: Number,
  },
  data() {
    return {
      store,
      stars: 5,
    }
  },
  methods: {
    getStars(vote, cycle) {
      if (vote > cycle - 1 && vote < cycle) {
        return "fa-solid fa-star-half-stroke"
      } else if (vote >= cycle) {
        return "fa-solid fa-star"
      } else {
        return "fa-regular fa-star"
      }

    }
  },
}
</script>

<style lang="scss" scoped>
.flag {
  img {
    width: 20px;
  }
}
</style>