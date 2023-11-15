<template>
  <div class="flip-card my-4">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="(path != null ? (store.imagePath + path) : store.imageDefault)" class="card-img-top" :alt="title">
      </div>
      <div class="flip-card-back">
        <div>
          <h5>Title: </h5>
          <span>{{ title }}</span>
        </div>
        <div>
          <h6>Original: </h6>
          <span>{{ original }}</span>
        </div>
        <div class="flag">
          <h6>Language: </h6>
          <img :src="`/images/flags/${language}.svg`" :alt="language">
        </div>
        <div>
          <h6>Vote: </h6>
          <i :class="getStars(vote, star)" v-for="star in stars"></i>
        </div>
        <div>
          <h6>Overview: </h6>
          <span>{{ overview }}</span>
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
    overview: String,
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
@use "../assets/styles/partials/variables" as *;

.flag {
  img {
    width: 20px;
  }
}

.flip-card {
  height: 450px;
  perspective: 1000px;

  &:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-front>img {
  height: 100%;
  width: 100%;
}

.flip-card-back {
  background-color: $color_black;
  color: $color_white;
  border: 1px solid $color_white;
  overflow-y: auto;
  transform: rotateY(180deg);

  div {
    padding: 0.5em;

    h5,
    h6 {
      display: inline;
      font-weight: bold;
    }
  }
}
</style>