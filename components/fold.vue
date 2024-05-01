<script setup lang="ts">
import { ref } from "vue";

const fold = ref<boolean>(false);
const {title} = defineProps<{
  title: string;
}>();

</script>
<template>
  <div
    class="base"
    :class="{'fold': fold}"
  >
    <header class="flex flex-row justify-between items-center">
      <label> {{ title }} </label>
      <hr>
      <Button @click="fold = !fold">
        {{ fold ? 'fold' : 'unfold' }}
      </Button>
    </header>
    <main class="flex flex-col">
      <div v-show="fold">
        <!-- <span class="fold-placehold" /> -->
        <slot />
      </div>
      <!-- <template v-else> -->
      <!--   <slot /> -->
      <!-- </template> -->
    </main>
  </div>
</template>

<style scoped lang="scss">
.base {
  transition: all 0.3s;
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0.5rem;
}

.fold-placehold {
  height: 0;
  width: 100%;
}

label {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem;
}

hr {
  border: none;
  border-top: 2px dotted #f00;
  color: #fff;
  background-color: #fff;
  height: 3px;
  width: 80%;
}
</style>
