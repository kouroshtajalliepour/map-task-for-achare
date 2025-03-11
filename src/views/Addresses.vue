<script setup>
import { useAddressesStore } from '@/stores/getAddresses';
import { onMounted } from 'vue';

const addressesStore = useAddressesStore();

onMounted(() => {
  addressesStore.fetchAddresses();
});
</script>

<template></template>
