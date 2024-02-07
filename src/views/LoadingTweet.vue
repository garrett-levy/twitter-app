<template>
  <div class="loading-tweet">
    <div class="loading-header">
      <span class="loading-content"></span>
    </div>
    <div class="loading-content">
      <span class="loading-content"></span>
    </div>
    <div class="loading-footer">
      <span class="loading-content"></span>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
@keyframes fadeInOut {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.loading-tweet {
  border: 1px solid #e5e5e5;
  margin-bottom: 15px;
  height: 50px;
  background: #ffffff;
  width: 98%;
  background: white;
  animation: fadeInOut 1s infinite; /* Adjust animation duration as needed */
  height: 80px;
}

</style>
