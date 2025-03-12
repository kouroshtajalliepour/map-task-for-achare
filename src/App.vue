<script setup lang="ts">
import Logo from "@/components/icons/logo.vue";
</script>

<template>
  <nav class="navigation-bar">
    <Logo />
    <div class="navigation-link-wrapper">
      <router-link class="app-link" to="/">ثبت آدرس</router-link>
      <router-link class="app-link" to="/addresses">مشاهده آدرس ها</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import "@/assets/styles/global.scss";

.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 12px 16px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  .app-link {
    font-weight: 700;
    margin-right: 20px;
    font-size: 12px;
    text-decoration: none;
    color: $Primary-color;
  }
  .router-link-active {
    color: $text-color;
  }
}
@media only screen and (min-width: 992px) {
  .navigation-bar {
    padding: 18px 80px;
    .app-link {
      font-size: 14px;
      margin-right: 26px;
    }
  }
}
</style>
