<script setup>
import { useAddressesStore } from '@/stores/address';
import { onMounted } from 'vue';

import AddressCard from '@/components/addressCard.vue';

const addressesStore = useAddressesStore();
const registeredAddresses = addressesStore.$state.addresses;
onMounted(async () => {
  try {
    await addressesStore.fetchAddresses();
    console.log(registeredAddresses);
  } catch (error) {
    console.log('🚀 ~ onMounted ~ error:', error);
  }
});
</script>

<template>
  <div class="addresses-page-wrapper">
    <div v-if="registeredAddresses" class="addresses-page-content">
      <h1 class="page-title">آدرس ها و مشخصات</h1>
      <AddressCard
        v-for="userData in registeredAddresses"
        :key="userData.id"
        :first_name="userData.first_name"
        :last_name="userData.last_name"
        :gender="userData.gender"
        :mobile_number="userData.coordinate_mobile"
        :phone_number="userData.coordinate_phone_number"
        :address="userData.address"
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
