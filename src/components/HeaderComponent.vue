<template>
  <header class="row m-0">
    <div class="col-12 d-flex justify-content-center align-items-end pb-5">
      <div class="d-flex">
        <input type="text" class="form-control" placeholder="Search..." v-model="store.params.query" />
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

<style lang="scss" scoped></style>