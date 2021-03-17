<template>
  <div>
    <!-- Search -->
    <header class="search">
      <div class="search-wrapper">
        <input type="text" v-model="query" @keyup="searchGifs" />
      </div>
    </header>

    <!-- Gifs -->
    <transition-group tag="ul" class="gifs-list" name="fade">
      <li v-for="(gif, index) in gifs" :key="index">
        <img alt="gif" :src="gif.url" />
      </li>
    </transition-group>

    <!-- Loader -->
    <div class="loader-wrap" v-show="isLoading">
      <div class="loader-dual-ring"></div>
    </div>

    <!-- Error Message -->
    <div class="error-message" v-if="!gifs.length">
      <p>No Gifs upon your request. Please try another request</p>
    </div>
  </div>
</template>

<script>
import { fetchData } from "../utils/getData";
import { debounce } from "lodash";

export default {
  name: "HomePage",
  data() {
    return {
      gifs: [],
      newGifs: [],
      isLoading: true,
      limit: 15,
      offset: 0,
      query: "",
    };
  },
  async mounted() {
    // Get data
    this.gifs = await fetchData(this.limit, this.offset, this.query);
    this.isLoading = false;

    // Add scroll
    document.addEventListener("scroll", debounce(this.scroll, 300));
  },
  beforeDestroy() {
    document.removeEventListener("scroll", debounce(this.scroll, 200));
  },
  methods: {
    async addMoreItems() {
      this.newGifs = await fetchData(this.limit, this.offset, this.query);
      this.gifs = this.gifs.concat(this.newGifs);
      this.offset += this.limit;
      this.isLoading = false;
    },
    scroll() {
      const scrolledToBottom =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (scrolledToBottom) {
        this.isLoading = true;
        debounce(this.addMoreItems, 300)();
      }
    },
    async searchGifs() {
      if (this.query.length <= 2) return (this.gifs = []);

      return (this.gifs = await fetchData(this.limit, this.offset, this.query));
    },
  },
};
</script>

<style></style>
