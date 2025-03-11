<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  first_name: {
    type: String,
    default: 'علی',
  },
  last_name: {
    type: String,
    default: 'ارشدی',
  },
  gender: {
    type: String,
    default: 'male',
  },
  mobile_number: {
    type: String,
    default: '-',
  },
  phone_number: {
    type: String,
    default: '-',
  },
  address: {
    type: String,
    default: '-',
  },
});
</script>

<template>
  <div class="address-card-wrapper">
    <div class="name-wrapper-mobile title-data-wrapper">
      <p class="title">نام و نام خانوادگی</p>
      <p class="data">{{ first_name }} {{ last_name }}</p>
    </div>
    <div class="first-name-wrapper-desktop title-data-wrapper">
      <p class="title">نام</p>
      <p class="data">{{ first_name }}</p>
    </div>
    <div class="last-name-wrapper-desktop title-data-wrapper">
      <p class="title">نام خانوادگی</p>
      <p class="data">{{ last_name }}</p>
    </div>
    <div class="gender-wrapper title-data-wrapper">
      <p class="title">جنسیت</p>
      <p class="data">{{ gender === 'female' ? 'خانوم' : 'آقا' }}</p>
    </div>
    <div class="mobile-number-wrapper title-data-wrapper">
      <p class="title">شماره تلفن همراه</p>
      <p class="data">{{ mobile_number }}</p>
    </div>
    <div class="phone-number-wrapper title-data-wrapper">
      <p class="title">شماره تلفن ثابت</p>
      <p class="data">{{ phone_number }}</p>
    </div>
    <div class="address-wrapper title-data-wrapper">
      <p class="title">آدرس</p>
      <p class="data">
        {{ address }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/global.scss';

.address-card-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px 16px;
  background-color: #ffffff;
  border: solid 1px #edf0f2;
  border-radius: 4px;
}
.title-data-wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  .title {
    font-weight: 400;
    font-size: 14px;
    color: $main-gray;
  }
  .data {
    font-weight: 700;
    font-size: 14px;
    color: $text-color;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.address-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: 1px solid #e0e0e0;
  padding-top: 12px;
  width: 100%;
  .title {
    margin-bottom: 10px;
  }
}
.first-name-wrapper-desktop {
  display: none;
}
.last-name-wrapper-desktop {
  display: none;
}
@media only screen and (min-width: 992px) {
  .address-card-wrapper {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .title-data-wrapper {
    flex-basis: calc(100% / 3);
    flex-direction: column;
    align-items: flex-start;
    width: auto;
    .title {
      margin-bottom: 14px;
    }
  }
  .address-wrapper {
    border: none;
    padding-top: 0;
  }
  .name-wrapper-mobile {
    display: none;
  }
  .first-name-wrapper-desktop {
    display: flex;
  }
  .last-name-wrapper-desktop {
    display: flex;
  }
}
</style>
