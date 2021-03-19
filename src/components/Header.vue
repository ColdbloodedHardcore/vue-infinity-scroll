<template>
  <div class="search">
    <div class="search-wrapper">
      <input type="text" v-model="query" @keyup="searchGifs" />
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";

export default {
  name: "Header",
  data() {
    return {
      query: "",
    };
  },
  methods: {
    searchGifs() {
      this.$emit("searchGifs", this.query);
    },
    search() {
      debounce(this.searchGifs, 400);
    },
  },
};
</script>

<style lang="scss">
.search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #0f2027;
  background: -webkit-linear-gradient(to right, #2c5364, #203a43, #0f2027);
  background: linear-gradient(to right, #2c5364, #203a43, #0f2027);

  &-wrapper {
    width: 100%;
    max-width: 1360px;
    margin: 0 auto;

    input {
      width: -webkit-fill-available;
      margin: 20px auto;
      height: 45px;
      font-size: 24px;
      border-radius: 12px;
      border: 1px solid black;
      padding: 0px 25px;

      &:active,
      &:focus {
        border-color: #2c7efa;
        outline: 0;
        box-shadow: 0 0 0 0.25rem #2c7efa;
      }
    }
  }
}
</style>
