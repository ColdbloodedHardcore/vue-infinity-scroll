<template>
  <div class="error-message">
    <p>No Gifs upon your request. Please try another request</p>
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
};
</script>

<style lang="scss">
.error-message {
  p {
    color: white;
    font-size: 24px;
  }
}
</style>
