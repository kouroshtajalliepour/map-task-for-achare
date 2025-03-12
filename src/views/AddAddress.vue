<script setup lang="ts">
// * imports
import { ref } from "vue";
import { useAddressesStore } from "@/stores/address";
import Map from "@/components/inputs/map.vue";
import TextInput from "@/components/inputs/text.vue";
import RadioInput from "@/components/inputs/radio.vue";
import CheckIcon from "@/components/icons/check.vue";
import LoadIcon from "@/components/icons/load.vue";
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
const formLoading = ref(false);
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

// * functions
function handleButtonClick() {
  if (formLoading.value) {
    return;
  }
  switch (pageStatus.value) {
    case 0:
      navigateToMap();
      break;
    case 1:
      addAddress();
      break;

    default:
      break;
  }
}

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
    formLoading.value = true;
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
  } finally {
    formLoading.value = false;
  }
}
</script>

<template>
  <main>
    <section class="create-address-page-outer-wrapper">
      <div :class="['create-address-page-wrapper', pageStatus === 1 ? 'no-padding' : '']">
        <h3 v-if="pageStatus === 0" class="add-address page-heading">ثبت آدرس</h3>
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
        </div>

        <div v-if="pageStatus === 2" class="create-address-page success-page">
          <div class="address-added-wrapper">
            <div class="success-message-wrapper">
              <CheckIcon />
              <p class="success-message-context">اطلاعات شما با موفقیت ثبت شد</p>
            </div>
            <router-link class="see-info-button" to="/addresses"
              >مشاهده اطلاعات</router-link
            >
          </div>
        </div>
      </div>
    </section>
    <div class="footer-reserve-space"></div>
    <footer v-if="pageStatus !== 2" class="app-footer">
      <button class="app-footer-button" type="button" @click="handleButtonClick">
        <LoadIcon v-if="formLoading" />
        <p v-else class="button-context">ثبت و ادامه</p>
      </button>
    </footer>
  </main>
</template>

<style lang="scss">
@import "@/assets/styles/global.scss";
.create-address-page-outer-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 140px);
  .create-address-page-wrapper {
    padding: 30px 16px;
    width: 90vw;
    max-width: 806px;
    &.no-padding {
      padding: 0;
      width: 100%;
      height: 100%;
    }
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
        .invisible-submit {
          visibility: hidden;
          width: 0px;
          height: 0px;
        }
      }
      &.map-page {
        padding: 0;
        width: 100%;
        height: calc(100vh - 180px);
      }
    }
    .form-map-input {
      width: 100%;
      height: 100vh;
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
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
.footer-reserve-space {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
}
.app-footer {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  .app-footer-button {
    width: 343px;
    max-width: 90vw;
    height: 48px;
    outline: none;
    color: white;
    cursor: pointer;
    background-color: #00bfa5;
    border: none;
    border-radius: 5px;
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
      &.map-page {
        width: 800px;
        height: 420px;
      }
    }
  }
}
</style>
