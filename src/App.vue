<script setup lang="ts">
import Logo from '@/components/icons/logo.vue';
</script>

<template>
  <nav class="navigation-bar">
    <Logo />
    <div class="navigation-link-wrapper">
      <router-link to="/">ثبت آدرس</router-link>
      <router-link to="/addresses">مشاهده آدرس ها</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import '@/assets/styles/global.scss';

.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 12px 16px;
  margin-bottom: 24px;
  a {
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
</style>
