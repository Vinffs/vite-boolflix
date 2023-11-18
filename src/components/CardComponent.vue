<template>
  <div class="flip-card my-4" @mouseover="addCast()">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="(path != null ? (store.imagePath + path) : store.imageDefault)" class="card-img-top" :alt="name">
      </div>
      <div class="flip-card-back">
        <div>
          <h5>Title:</h5>
          <span>{{ name }}</span>
        </div>
        <div>
          <h6>Original:</h6>
          <span>{{ original }}</span>
        </div>
        <div class="flag">
          <h6>Language:</h6>
          <img :src="`/images/flags/${language}.svg`" :alt="language">
        </div>
        <div>
          <h6>Vote:</h6>
          <i :class="getStars(vote, star)" v-for="star in stars"></i>
        </div>
        <div>
          <h6>Genres:</h6>
          <span v-for="item in genre">{{ getGenreName(item) }} </span>
        </div>
        <div>
          <h6>Cast:</h6>
          <div class="px-2 py-1" v-for="person in this.cast">{{ person }} </div>
        </div>
        <div>
          <h6>Overview:</h6>
          <span>{{ overview }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../assets/data/store";
import axios from "axios";
export default {
  name: 'CardComponent',
  props: {
    path: String,
    name: String,
    original: String,
    language: String,
    vote: Number,
    overview: String,
    genre: Array,
    id: Number,
    type: String,
    casting: Array,
  },
  data() {
    return {
      store,
      stars: 5,
      cast: [],
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

    },
    getGenreName(id) {
      const finder = this.store.genresList.find((el) => el.id == id)
      if (finder) {
        return finder.name;
      }
    },
    addCast() {
      if (this.cast && this.cast.length > 0) {
        return
      }
      const url = this.store.url + "/" + this.type + "/" + this.id + this.store.ep.credits;
      const params = this.store.apiOnly

      axios.get(url, { params }).then((results) => {
        this.cast = [];
        for (let i = 0; i < 5; i++) {
          if (results.data.cast[i]) {
            this.cast.push(results.data.cast[i].name)
          }
        }
      })
      console.log(store.genreID)
    },

  },

};
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

  & span {
    text-wrap: balance;
    padding: 0 0.5em;
    display: inline-block;
  }

  ;
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
    padding: 1em;

    h5,
    h6 {
      display: inline;
      font-weight: bold;
      padding: 0 0.2em 0 0.5em;
    }
  }
}
</style>