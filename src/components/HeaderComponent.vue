<template>
  <header class="row">
    <div class="col-12 d-flex justify-content-between py-3 px-5">
      <div class="imgContainer">
        <img src="/images/logo.png" alt="logo">
      </div>
      <div class="d-flex">
        <input type="text" class="form-control bg-dark text-white" placeholder="Search..." v-model="store.params.query" />
        <button class="ms-2 btn btn-danger" type="button" @click="$emit('clicked')">
          Search
        </button>
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
  &::placeholder {
    color: $color_white !important;
  }
}
</style>