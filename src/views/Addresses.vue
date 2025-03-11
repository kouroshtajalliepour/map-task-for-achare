<script setup>
import { useAddressesStore } from "@/stores/address";
import { onMounted } from "vue";

const addressesStore = useAddressesStore();
const yo = addressesStore.$state.addresses;
onMounted(async () => {
  try {
    await addressesStore.fetchAddresses();
  } catch (error) {
    console.log("🚀 ~ onMounted ~ error:", error);
  }
});
</script>

<template>
  {{ yo }}
</template>
