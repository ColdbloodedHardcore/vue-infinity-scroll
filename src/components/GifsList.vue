<template>
  <section>
    <transition-group tag="ul" class="gifs-list" name="fade">
      <li v-for="(gif, index) in gifs" :key="index">
        <img :src="gif.url" alt="gif" />
      </li>
    </transition-group>
  </section>
</template>

<script>
export default {
  name: "GifsList",
  props: {
    gifs: { type: Array },
  },
};
</script>

<style lang="scss">
.gifs-list {
  padding: 0;
  list-style: none;
  list-style-position: outside;
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-top: 100px;

  & > * {
    width: 33.3333%;
    height: 300px;
    padding-top: 10px;
    padding-left: 10px;
    box-sizing: border-box;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
