<script setup lang="ts">
import { ref } from "vue";

// * imports
import Map from "@/components/inputs/map.vue";

const latLang = ref([35.6892, 51.389]);
</script>

<template>
  <div>
    <ClientOnly>
      <Map class="form-map-input" v-model="latLang" />

      <p>lat : {{ latLang[0] }}, lang : {{ latLang[1] }}</p>
    </ClientOnly>
  </div>
</template>

<style>
.form-map-input {
  width: 500px;
  height: 500px;
}
</style>
