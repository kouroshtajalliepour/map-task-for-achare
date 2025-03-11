<script setup lang="ts">
// * imports
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useAddressesStore } from "@/stores/address";
import AddressCard from "@/components/addressCard.vue";

const addressesStore = useAddressesStore();

const { addresses, loading } = storeToRefs(addressesStore);

onMounted(async () => {
  try {
    await addressesStore.fetchAddresses();
    console.log(addresses);
  } catch (error) {
    console.log("🚀 ~ onMounted ~ error:", error);
  }
});
</script>

<template>
  <div class="addresses-page-wrapper">
    <h1 class="page-title">آدرس ها و مشخصات</h1>
    <ul class="addresses-wrapper">
      <AddressCard v-if="loading" v-for="i in 20" loading />
      <AddressCard v-else v-for="address in addresses" :cartData="address" />
    </ul>
  </div>
</template>

<style lang="scss">
.addresses-page-wrapper {
  padding: 0px 16px;
  max-width: 806px;
  margin: auto;

  .addresses-wrapper {
    list-style: none;
  }
}
</style>
