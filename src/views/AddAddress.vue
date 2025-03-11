<script setup lang="ts">
import { ref } from 'vue';

// * imports
import Map from '@/components/inputs/map.vue';
import TextInput from '@/components/inputs/text.vue';

const userAddress = ref({
  first_name: '',
  last_name: '',
  coordinate_mobile: '',
  coordinate_phone_number: '',
  address: '',
  latLang: [35.6892, 51.389],
  gender: '',
});

const showMap = ref(false);
</script>

<template>
  <div>
    <ClientOnly>
      <Map
        v-if="showMap"
        class="form-map-input"
        v-model="userAddress.latLang"
      />
    </ClientOnly>

    <div>
      <TextInput
        type="text"
        id="first_name"
        autocomplete="given-name"
        inputmode="text"
        v-model="userAddress.first_name"
      />
      <TextInput
        type="text"
        id="last_name"
        autocomplete="family-name"
        inputmode="text"
        v-model="userAddress.last_name"
      />
      <label for="phone_number">شماره</label>
      <TextInput
        type="number"
        dir="ltr"
        id="phone_number"
        autocomplete="tel"
        inputmode="tel"
        v-model="userAddress.coordinate_mobile"
      />
    </div>
  </div>
</template>

<style lang="scss">
* {
  direction: rtl;
}
.form-map-input {
  width: 500px;
  height: 500px;
}
</style>
