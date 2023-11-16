<template>
  <header>
    <div class="row">
      <div class="col-12 d-flex justify-content-between py-3 px-5">
        <div class="imgContainer">
          <img src="/images/logo.png" alt="logo">
        </div>
        <div class="d-flex">
          <i @click="(isActive = !isActive)" :class="(isActive ? 'd-none' : 'd-inline-block')"
            class="fa-solid fa-magnifying-glass fs-5 text-light pt-2"></i>
          <input :class="(isActive ? 'd-inline-block expandSearch' : 'd-none')" type="text" placeholder="Search Titles..."
            v-model="store.params.query" @keyup.enter="$emit('clicked', (isActive = !isActive))">
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { store } from "../assets/data/store";
export default {
  name: 'HeaderComponent',
  data() {
    return {
      store,
      isActive: false,
      enter: true,
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/variables' as *;

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100000;
  background-color: $color_black;
}

.imgContainer {
  width: 100px;

  img {
    width: 100%;
  }
}

input {
  width: 200px;
  margin-top: 0.5em;
  padding: 0.5em 1em;
  background-color: $color_black;
  border: 1px solid $color_white;
  border-radius: 5px;
  color: $color_white;

  &::placeholder {
    color: $color_white !important;
    background-color: $color_black !important;
    text-align: center;
  }
}

.expandSearch {
  animation-name: expand;
  animation-duration: 0.4s;
}

.downsizeSearch {
  animation-name: downsize;
  animation-duration: 0.4s;
}

@keyframes expand {
  0% {
    width: 0px;

  }

  100% {
    width: 200px;

  }
}

@keyframes downsize {
  0% {
    width: 200px;

  }

  100% {
    width: 0px;

  }
}
</style>