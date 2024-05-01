<script setup lang="ts">
import { ref, defineProps, defineModel } from "vue";

const isEdit = ref<boolean>(false);
defineProps<{
  PairKey: string;
}>();
const value = defineModel<string>("");

</script>
<template>
  <div>
    <label> {{ PairKey }} </label>
    <span v-if="isEdit"> {{ value }} </span>
    <input
      v-else
      v-model="value"
    >
    <div />
  </div>
</template>

<style scoped>

</style>
