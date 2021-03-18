<template>
  <div>
    <Header @searchGifs="searchGifs" />

    <GifsList v-bind="{ gifs }" />

    <Loader v-show="isLoading" />

    <ErrorMessage v-if="!gifs.length" />
  </div>
</template>

<script>
import { fetchData } from "../utils/getData";
import { debounce } from "lodash";

import Header from "../components/Header";
import GifsList from "../components/GifsList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default {
  name: "HomePage",
  components: {
    Header,
    GifsList,
    Loader,
    ErrorMessage,
  },
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
      this.offset += this.limit;
      this.newGifs = await fetchData(this.limit, this.offset, this.query);
      this.gifs = this.gifs.concat(this.newGifs);
      this.isLoading = false;
    },
    async searchGifs(query) {
      this.query = query;

      if (this.query.length <= 2) return (this.gifs = []);

      return (this.gifs = await fetchData(this.limit, this.offset, this.query));
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
