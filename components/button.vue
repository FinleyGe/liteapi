<script setup lang="ts">

</script>
<template>
  <button class="m-2 p-2 bg-pink-300 rounded-xl text-white flex-row flex h-8 hover:bg-pink-400 transition-all justify-center items-center">
    <slot />
    <div class="w-6 mx-2">
      <slot name="icon" />
    </div>
  </button>
</template>

<style scoped lang="scss">
</style>
