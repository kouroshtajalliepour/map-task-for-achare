<script setup lang="ts">
// * imports
import { ref } from "vue";
import { useAddressesStore } from "@/stores/address";
import Map from "@/components/inputs/map.vue";
import TextInput from "@/components/inputs/text.vue";
import RadioInput from "@/components/inputs/radio.vue";
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
const genderEntries = ref([
  {
    key: "male",
    value: "آقا",
  },
  {
    key: "female",
    value: "خانم",
  },
]);

function navigateToMap() {
  if (
    !userAddress.value.first_name ||
    !userAddress.value.last_name ||
    !userAddress.value.coordinate_mobile ||
    !userAddress.value.address ||
    !userAddress.value.gender
  ) {
    alert("لطفا فیلد های اجباری را تکمیل کنید");
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
    <h3 class="add-address page-heading">ثبت آدرس</h3>
    <form
      v-if="pageStatus === 0"
      class="create-address-page form-page"
      @submit.preventDefault="navigateToMap"
    >
      <h6 class="form-heading">لطفا مشخصات و آدرس خود را وارد کنید</h6>

      <div class="create-address-page-text-inputs-wrapper">
        <div class="create-address-text-input-wrapper">
          <label class="text-input-label" for="first_name">نام</label>
          <TextInput
            type="text"
            id="first_name"
            autocomplete="given-name"
            :validator="validateString"
            inputmode="text"
            v-model="userAddress.first_name"
          />
        </div>

        <div class="create-address-text-input-wrapper">
          <label class="text-input-label" for="last_name">نام خانوادگی</label>
          <TextInput
            type="text"
            id="last_name"
            autocomplete="family-name"
            :validator="validateString"
            inputmode="text"
            v-model="userAddress.last_name"
          />
        </div>
        <div class="create-address-text-input-wrapper">
          <label class="text-input-label" for="phone_number">شماره تلفن همراه</label>
          <TextInput
            type="number"
            id="phone_number"
            autocomplete="tel"
            :validator="validatePhoneNumber"
            inputmode="tel"
            v-model="userAddress.coordinate_mobile"
          />
        </div>
        <div class="create-address-text-input-wrapper">
          <label class="text-input-label" for="phone_number"
            >شماره تلفن ثابت (اختیاری)</label
          >
          <TextInput
            type="number"
            id="telephone_number"
            :validator="validatePhoneNumber"
            autocomplete="tel"
            inputmode="tel"
            v-model="userAddress.coordinate_phone_number"
          />
        </div>
        <div class="create-address-text-input-wrapper address-input">
          <label class="text-input-label" for="phone_number">آدرس</label>
          <TextInput
            type="text"
            id="address"
            :validator="validateString"
            autocomplete="address-line1"
            inputmode="text"
            v-model="userAddress.address"
          />
        </div>
      </div>

      <RadioInput v-model="userAddress.gender" :entries="genderEntries" />

      <input class="invisible-submit" type="submit" value="submit" />
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
.create-address-page-wrapper {
  padding: 0px 16px;
  max-width: 806px;
  margin: auto;
  .page-heading {
    font-size: 16px;
    color: #37474f;
    margin-bottom: 10px;
  }
  .create-address-page {
    padding: 16px;
    background-color: white;
    .form-heading {
      font-size: 12px;
      color: #37474f;
      margin-bottom: 16px;
    }
    &.form-page {
      .create-address-page-text-inputs-wrapper {
        .create-address-text-input-wrapper {
          .text-input-label {
            margin-bottom: 10px;
            font-size: 12px;
            display: block;
          }
        }
      }
    }
  }
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
}
@media only screen and (min-width: 992px) {
  .create-address-page-wrapper {
    .create-address-page {
      &.form-page {
        .create-address-page-text-inputs-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .create-address-text-input-wrapper {
            flex-basis: 30%;
            &.address-input {
              flex-basis: 65%;
            }
          }
        }
      }
    }
  }
}
</style>
