<script lang="ts" setup>
import { ref } from "vue";
import {ArrowUp, ArrowDown, Copy, Menu, Save} from "@vicons/carbon";
import {useClipboard} from "@vueuse/core";

import type {Request} from "./type";
// import type { SavedCurl } from "#build/components";
import SavedCurl from "./components/savedCurl.vue";

const curl = ref<string>("");
const parsed = ref<Request>({} as Request);
const sideShow = ref<boolean>(true);

async function handleInput() {
  const {data} = await useFetch("/api/parse",{
    method: "POST",
    body: {
      curl: curl.value
    }
  });
  parsed.value = JSON.parse(data.value) as Request;
}

// when manually changing the parsed value
async function handleChange() {
  const {data} = await useFetch("/api/generate",{
    method: "POST",
    body: {
      data: parsed.value
    }
  });
  curl.value = data.value;
}

const {copy} = useClipboard({source: curl});
const savedCurl = ref<InstanceType<typeof SavedCurl> | null>(null);

function handleSave() {
  if (!savedCurl.value) {
    return;
  }
  handleInput(); // parse the curl
  savedCurl.value?.addNew({
    curl: curl.value,
    name: parsed.value.url,
    date: new Date(),
  });
}

// savedCurl.value?.addNew()

function handleOpen(c: CURL) {
  curl.value = c.curl;
  handleInput();
}

</script>
<template>
  <!-- {{ parsed }} -->
  <div class="bg-gray-50 flex flex-col items-center h-svh justify-center">
    <div class="flex flex-col w-10/12 h-5/6 shadow-xl rounded-2xl">
      <header class="bg-pink-300 w-full p-3 text-white text-xl">
        LiteAPI
      </header>
      <main class="flex flex-row h-full">
        <aside :class="{'show': sideShow}">
          <SavedCurl ref="savedCurl" @open="handleOpen"/>
        </aside>
        <main class="w-full flex flex-col mx-4">
          <button
            class="w-8 h-8 rounded-3xl bg-pink-300 p-1 text-white"
            @click="sideShow = !sideShow"
          >
            <Menu />
          </button>
          <div
            class="overflow-scroll m-2 p-2"
          >
            <Input
              v-model="curl"
              class="w-full flex-1 min-h-20"
            />
            <div class="w-full">
              <Button
                class="w-full"
                @click="handleInput"
              >
                Parse
                <template #icon>
                  <ArrowDown />
                </template>
              </Button>
            </div>
          </div>
          <Display
            v-model="parsed"
            class="overflow-scroll"
            :level="0"
          />
          <Button
            class="w-full"
            @click="handleChange"
          >
            Generate
            <template #icon>
              <ArrowUp />
            </template>
          </Button>
          <Button
            class="w-full"
            @click="() => copy()"
          >
            Copy
            <template #icon>
              <Copy />
            </template>
          </Button>

          <Button
            class="w-full"
            @click="handleSave"
          >
            Save
            <template #icon>
              <Save />
            </template>
          </Button>
        </main>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
aside {
  width: 0;
  overflow: hidden;
  transition: 200ms ease-in-out;
  height: 100%;
  &.show {
    width: 24rem;
    transition: 200ms ease-in-out;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
  }
  button {
    position: absolute;
    right: -20px;
  }
}
</style>
