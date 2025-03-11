<script setup lang="ts">
// * imports
import { ref, onMounted, watch, defineEmits } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Pointer from "@/components/icons/pointer.vue";

// props and emits
const props = defineProps<{
  modelValue: number[];
}>();
const emit = defineEmits(["update:modelValue"]);

// * data
const mapContainer = ref(null);
const center = ref(props.modelValue);

// * watchers
watch(
  () => center.value,
  () => {
    emit("update:modelValue", center.value);
  }
);

// * hooks
onMounted(() => {
  if (!mapContainer.value) return;

  const map = L.map(mapContainer.value).setView(center.value, 13);

  L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
    attribution: "© Google Maps",
  }).addTo(map);

  map.on("moveend", () => {
    const newCenter = map.getCenter();
    center.value = [newCenter.lat, newCenter.lng];
    console.log("Map Center:", center.value);
  });
});
</script>

<template>
  <div class="map-input-wrapper">
    <div ref="mapContainer" class="map-container"></div>
    <Pointer class="pointer-icon" />
  </div>
</template>

<style lang="scss">
.map-input-wrapper {
  width: 100%;
  height: 100%;
  max-width: 800px;
  max-height: 800px;
  position: relative;
  background-color: red;
  .map-container {
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .pointer-icon {
    position: absolute;
    width: 48px;
    height: 48px;
    z-index: 2;
    top: calc(50% - 24px);
    right: calc(50% - 24px);
  }
}
</style>
