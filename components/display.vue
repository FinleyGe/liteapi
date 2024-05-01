<script setup lang="ts">
import Title from "./title.vue";

import {TrashCan, Add} from "@vicons/carbon";
import { defineModel, defineProps, defineEmits, ref} from "vue";

import type { Request} from "../type";

defineProps<{
  level: number;
}>();

const parsed = defineModel<Request>({} as Request);

const emit = defineEmits<{
  onchange: [];
}>();

const newKey = ref<string>("");
const newKey2 = ref<string>("");

</script>

<template>
  <div>
    <!-- {{ parsed }} -->
    <div class="flex flex-row align-middle items-center">
      <Title>
        URL
      </Title>
      <input
        v-model="parsed.url"
        class="w-full"
        :input="emit('onchange')"
      >
    </div>
    <div class="flex flex-row align-middle items-center">
      <Title>
        Method
      </Title>
      <Listbox>
        <ListboxOptions>
          <ListboxOption
            v-for="method in ['get', 'post', 'put', 'delete', 'patch']"
            :key="method"
            class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-pink-300 hover:text-white mx-1 rounded-md"
            :class="parsed.method == method ? 'bg-pink-400' : 'bg-pink-300'"
            @click="parsed.method = method"
          >
            {{ method }}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>
    <div class="flex flex-col align-middle items-center">
      <Title>
        Headers
      </Title>
      <div class="flex flex-col align-middle items-start gap-2 w-full">
        <div
          v-for="_, index in parsed.headers"
          :key="index"
          class="flex flex-row align-top items-center gap-4 w-full justify-between"
        >
          <span class="w-full flex flex-row">
            {{ index }}:
            <button
              class="w-4"
              @click="delete parsed.headers[index]"
            > <TrashCan />
            </button>
          </span>
          <input
            v-model="parsed.headers[index]"
            :input="emit('onchange')"
            class="w-full"
          >
        </div>
        <div
          class="flex flex-row align-top items-center gap-4 w-full justify-start"
        >
          <input
            v-model="newKey"
            :input="emit('onchange')"
            class="w-fit"
          >
          <button
            class="w-6 bg-pink-300 rounded-3xl"
            @click="() => {parsed.headers[newKey] = ''; newKey = ''}"
          >
            <Add />
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col align-middle items-center">
      <Title>
        Data
      </Title>
      <div class="flex flex-col align-middle items-start gap-2 w-full">
        <div
          v-for="_, index in parsed.data"
          :key="index"
          class="flex flex-row align-top items-center gap-4 w-full justify-between"
        >
          <span class="w-full flex flex-row">
            {{ index }}:
            <button
              class="w-4"
              @click="delete parsed.data[index]"
            > <TrashCan />
            </button>
          </span>
          <input
            v-model="parsed.data[index]"
            :input="emit('onchange')"
            class="w-full"
          >
        </div>
      </div>
      <div
        class="flex flex-row align-top items-center gap-4 w-full justify-start"
      >
        <input
          v-model="newKey2"
          :input="emit('onchange')"
          class="w-fit"
        >
        <button
          class="w-6 bg-pink-300 rounded-3xl"
          @click="() => {parsed.data[newKey2] = ''; newKey2 = ''}"
        >
          <Add />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  border: lightblue 1px solid;
  border-radius: 1rem;
  padding-inline: 0.25rem;
}
</style>
