<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  cartData?: {
    first_name: string;
    last_name: string;
    gender: string;
    mobile_number: string;
    phone_number: string;
    address: string;
  };
  loading?: boolean;
}>();

function sanitizeGender(gender: string) {
  switch (gender) {
    case "male":
      return "آقا";
      break;
    case "female":
      return "خانم";
      break;

    default:
      return "";
      break;
  }
}
</script>

<template>
  <li class="address-cart-wrapper">
    <div class="address-cart-data hide-in-desktop">
      <p class="address-cart-data-title">نام و نام خانوادگی</p>
      <p :class="['address-cart-data-value', loading ? 'skeleton-loader' : '']">
        {{ cartData?.first_name }} {{ cartData?.last_name }}
      </p>
    </div>
    <div class="address-cart-data hide-in-mobile">
      <p class="address-cart-data-title">نام</p>
      <p :class="['address-cart-data-value', loading ? 'skeleton-loader' : '']">
        {{ cartData?.first_name }}
      </p>
    </div>
    <div class="address-cart-data hide-in-mobile">
      <p class="address-cart-data-title">نام خانوادگی</p>
      <p :class="['address-cart-data-value', loading ? 'skeleton-loader' : '']">
        {{ cartData?.last_name }}
      </p>
    </div>
    <div class="address-cart-data">
      <p class="address-cart-data-title">شماره تلفن</p>
      <p :class="['address-cart-data-value', loading ? 'skeleton-loader' : '']">
        {{ cartData?.phone_number }}
      </p>
    </div>
    <div class="address-cart-data">
      <p class="address-cart-data-title">شماره تلفن</p>
      <p :class="['address-cart-data-value', loading ? 'skeleton-loader' : '']">
        {{ cartData?.mobile_number }}
      </p>
    </div>
    <div class="address-cart-data">
      <p class="address-cart-data-title">جنسیت</p>
      <p :class="['address-cart-data-value', loading ? 'skeleton-loader' : '']">
        {{ sanitizeGender(cartData?.gender?.toLocaleLowerCase()) }}
      </p>
    </div>
    <div class="address-cart-data address-cart-address-wrapper">
      <p class="address-cart-data-title">آدرس</p>
      <p :class="['address-cart-data-value', loading ? 'skeleton-loader' : '']">
        {{ cartData?.address }}
      </p>
    </div>
  </li>
</template>

<style lang="scss">
.skeleton-loader {
  width: 100%;
  // height: 15px;
  // display: block;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 500px;
  background-position: 0 0;
  animation: shine 1s infinite;
}

.address-cart-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  background-color: white;

  .address-cart-data {
    padding: 16px;
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    .address-cart-data-title,
    .address-cart-data-value {
      height: 22px;
      font-size: 14px;
      &.skeleton-loader {
        width: 115px;
      }
    }
    .address-cart-data-title {
      color: #9b9b9b;
    }
    &.hide-in-mobile {
      display: none;
    }
    &.address-cart-address-wrapper {
      border-top: 1px solid #e0e0e0;
      display: block;
      .address-cart-data-value {
        margin-top: 16px;
      }
    }
  }
}
@media only screen and (min-width: 992px) {
  .address-cart-wrapper {
    .address-cart-data {
      flex-basis: calc(25%);
      flex-direction: column;
      .address-cart-data-title {
        margin-bottom: 14px;
      }
      &:nth-child(3n + 1) {
        flex-basis: calc(50%);
      }
      &.hide-in-mobile {
        display: flex;
      }
      &.hide-in-desktop {
        display: none;
      }
      &.address-cart-address-wrapper {
        border-top: none;
        display: flex;
        .address-cart-data-value {
          margin-top: 0px;
        }
      }
    }
  }
}
</style>
