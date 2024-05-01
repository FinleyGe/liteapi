<script setup lang="ts">
import { ref } from "vue";
import {TrashCan} from "@vicons/carbon";

import type { CURL } from "~/type";

const curls = ref<CURL[]>([]);

const emit = defineEmits<{
  open: [value: CURL]
}>();

function saveToStorage(){
  localStorage.setItem("curls", JSON.stringify(curls.value));
}

function getFromStorage(){
  const data = localStorage.getItem("curls");
  if(data){
    curls.value = JSON.parse(data);
  }
}

function refresh(){
  getFromStorage();
}

function addNew(curl: CURL){
  curls.value.push(curl);
  saveToStorage();
}

function handleClicked(curl: CURL){
  emit("open", curl);
}

function handleDelete(curl: CURL){
  curls.value = curls.value.filter(item => item !== curl);
  saveToStorage();
}

defineExpose({
  addNew,
  refresh
});

onMounted(() => {
  getFromStorage();
});

</script>
<template>
  <!-- {{ curls }} -->
  <span
    v-if="curls.length == 0"
    class="text-xl"
  > There is no cURLs saved </span>
  <div
    v-for="item in curls"
    :key="item.name"
    class="bg-pink-300 m-2 p-2 hover:bg-pink-400 hover:cursor-pointer"
    @click="handleClicked(item)"
  >
    <span class="text-white text-xl">
      {{ item.name }}
    </span>
    <br>
    <span class="text-white text-sm"> {{ item.date.toLocaleString() }} </span>
    <button
      class="bg-white text-black p-1 m-1 rounded-lg w-6 h-6"
      @click="() => handleDelete(item)"
    >
      <TrashCan />
    </button>
  </div>
</template>

<style scoped>

</style>
