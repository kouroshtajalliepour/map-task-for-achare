<script setup>
import { useAddressesStore } from '@/stores/address';
import { onMounted } from 'vue';

const addressesStore = useAddressesStore();
const yo = addressesStore.$state.addresses;
onMounted(() => {
  addressesStore.fetchAddresses();
});
</script>

<template>
  {{ yo }}
</template>
