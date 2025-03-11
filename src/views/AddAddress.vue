<script setup lang="ts">
import { ref } from "vue";
import { useAddressesStore } from "@/stores/address";
// * imports
import Map from "@/components/inputs/map.vue";
import TextInput from "@/components/inputs/text.vue";

const createAddress = useAddressesStore();

const userAddress = ref({
  first_name: "",
  last_name: "",
  coordinate_mobile: "",
  coordinate_phone_number: "",
  address: "",
  latLang: [35.6892, 51.389],
  gender: "",
});

const showMap = ref(false);

async function addAddress() {
  try {
    await createAddress.createAddress({
      first_name: userAddress.value.first_name,
      last_name: userAddress.value.last_name,
      coordinate_mobile: userAddress.value.coordinate_mobile,
      coordinate_phone_number: userAddress.value.coordinate_phone_number,
      address: userAddress.value.address,
      lat: userAddress.value.latLang[0],
      lang: userAddress.value.latLang[1],
      gender: userAddress.value.gender,
    });
  } catch (error) {
    console.log("🚀 ~ addAddress ~ error:", error);
  }
}
</script>

<template>
  <div>
    <ClientOnly>
      <Map class="form-map-input" v-model="userAddress.latLang" />
    </ClientOnly>

    <div>
      <label for="first_name">نام</label>
      <TextInput
        type="text"
        id="first_name"
        autocomplete="given-name"
        inputmode="text"
        v-model="userAddress.first_name"
      />
      <label for="last_name">نام خانوادگی</label>
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
      <label for="phone_number">خونه</label>
      <TextInput
        type="number"
        dir="ltr"
        id="telephone_number"
        autocomplete="tel"
        inputmode="tel"
        v-model="userAddress.coordinate_phone_number"
      />
      <label for="phone_number">آدرس</label>
      <TextInput
        type="text"
        dir="ltr"
        id="address"
        autocomplete="address-line1"
        inputmode="text"
        v-model="userAddress.address"
      />
      <div class="radio_gender">
        <label>
          <input value="male" type="radio" v-model="userAddress.gender" />
          مرد
        </label>
        <label>
          <input value="female" type="radio" v-model="userAddress.gender" />
          زن
        </label>
      </div>
    </div>
    <button @click="addAddress">bezan bereeeeee</button>
  </div>
</template>

<style lang="scss">
* {
  direction: rtl;
}
.form-map-input {
  width: 200px;
  height: 200px;
}
</style>
