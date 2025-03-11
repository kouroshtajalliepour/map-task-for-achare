<script setup lang="ts">
// * imports
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useAddressesStore } from "@/stores/address";
import AddressCard from "@/components/addressCard.vue";

const addressesStore = useAddressesStore();

const { addresses } = storeToRefs(addressesStore);

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
    <div v-if="addresses" class="addresses-page-content">
      <h1 class="page-title">آدرس ها و مشخصات</h1>
      <AddressCard
        v-for="address in addresses"
        :key="address.id"
        :first_name="address.first_name"
        :last_name="address.last_name"
        :gender="address.gender"
        :mobile_number="address.coordinate_mobile"
        :phone_number="address.coordinate_phone_number"
        :address="address.address"
        class="user-data-card"
      />
    </div>
  </div>
</template>

<style lang="scss">
.addresses-page-wrapper {
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  h1 {
    justify-self: flex-start;
  }
}
.addresses-page-content {
  min-width: 80%;
  .page-title {
    font-size: 16px;
    font-weight: 400;
    line-height: 32px;
    margin-bottom: 10px;
  }
}
.user-data-card {
  margin-bottom: 12px;
}

@media only screen and (min-width: 768px) {
  .addresses-page-content {
    min-width: 70%;
  }
}
@media only screen and (min-width: 992px) {
  .addresses-page-content {
    min-width: 65%;
    max-width: 65%;
  }
  .user-data-card {
    margin-bottom: 20px;
  }
}
</style>
