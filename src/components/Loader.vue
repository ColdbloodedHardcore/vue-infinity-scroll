<template>
  <div class="loader-wrap">
    <div class="loader-dual-ring"></div>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style lang="scss">
.loader-wrap {
  text-align: center;
  .loader-dual-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
    padding-top: 40px;

    &:after {
      content: " ";
      display: block;
      width: 46px;
      height: 46px;
      margin: 1px;
      border-radius: 50%;
      border: 5px solid white;
      border-color: white transparent white transparent;
      animation: loader-dual-ring 1.2s linear infinite;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes loader-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
