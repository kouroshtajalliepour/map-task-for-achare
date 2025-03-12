<script setup lang="ts">
// * imports
import { ref } from "vue";
import { useAddressesStore } from "@/stores/address";
import Map from "@/components/inputs/map.vue";
import TextInput from "@/components/inputs/text.vue";
import Check from "@/components/icons/check.vue";
import useValidators from "@/composables/useValidators";

// * composables
const createAddress = useAddressesStore();
const { validateString, validatePhoneNumber } = useValidators();

// * page data
const userAddress = ref({
  first_name: "",
  last_name: "",
  coordinate_mobile: "",
  coordinate_phone_number: "",
  address: "",
  latLang: [35.6892, 51.389],
  gender: "",
});
const pageStatus = ref(0);

function navigateToMap() {
  if (
    !userAddress.value.first_name ||
    !userAddress.value.last_name ||
    !userAddress.value.coordinate_mobile ||
    !userAddress.value.coordinate_phone_number ||
    !userAddress.value.address ||
    !userAddress.value.gender
  ) {
    alert("تمامی فیلد ها ضروری اند");
    return;
  }
  pageStatus.value++;
}

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
    pageStatus.value++;
  } catch (error) {
    console.log("🚀 ~ addAddress ~ error:", error);
  }
}
</script>

<template>
  <div class="create-address-page-wrapper">
    <form
      v-if="pageStatus === 0"
      class="create-address-page form-page"
      @submit="navigateToMap"
    >
      <label for="first_name">نام</label>
      <TextInput
        type="text"
        id="first_name"
        autocomplete="given-name"
        :validator="validateString"
        inputmode="text"
        v-model="userAddress.first_name"
      />
      <label for="last_name">نام خانوادگی</label>
      <TextInput
        type="text"
        id="last_name"
        autocomplete="family-name"
        :validator="validateString"
        inputmode="text"
        v-model="userAddress.last_name"
      />
      <label for="phone_number">شماره</label>
      <TextInput
        type="number"
        dir="ltr"
        id="phone_number"
        autocomplete="tel"
        :validator="validatePhoneNumber"
        inputmode="tel"
        v-model="userAddress.coordinate_mobile"
      />
      <label for="phone_number">خونه</label>
      <TextInput
        type="number"
        dir="ltr"
        id="telephone_number"
        :validator="validatePhoneNumber"
        autocomplete="tel"
        inputmode="tel"
        v-model="userAddress.coordinate_phone_number"
      />
      <label for="phone_number">آدرس</label>
      <TextInput
        type="text"
        dir="ltr"
        id="address"
        :validator="validateString"
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
      <input type="submit" value="submit" />
    </form>
    <div v-if="pageStatus === 1" class="create-address-page map-page">
      <Map class="form-map-input" v-model="userAddress.latLang" />
      <button @click="addAddress" type="button" name="next-page">submit</button>
    </div>
    <div v-if="pageStatus === 2" class="create-address-page success-page">
      <div class="address-added-wrapper">
        <div class="success-message-wrapper">
          <Check />
          <p class="success-message-context">اطلاعات شما با موفقیت ثبت شد</p>
        </div>
        <router-link class="see-info-button" to="/addresses">مشاهده اطلاعات</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/global.scss";
.form-map-input {
  width: 200px;
  height: 200px;
}
.address-added-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 114px;
  .success-message-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    .success-message-context {
      margin-top: 14px;
    }
    .see-info-button {
      border: 1.5px solid $Primary-color;
      border-radius: 4px;
      width: 340px;
      text-align: center;
      padding: 12px 0px;
      font-weight: 700;
      font-size: 16px;
      text-decoration: none;
      color: $Primary-color;
    }
  }
}
</style>
