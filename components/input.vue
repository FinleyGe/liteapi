<script setup lang="ts">
import { defineModel, defineEmits } from "vue";

const curl = defineModel<string>();

const emit = defineEmits<{
  input: [string];
}>();

</script>
<template>
  <textarea
    v-model="curl"
    class="rounded-xl p-2 w-1/2 h-32 shadow-xl"
    placeholder="Enter cURL command here"
    @change="e=> emit('input', e!.target?.value as string)"
  />
</template>

<style scoped lang="scss">

</style>
