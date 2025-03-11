// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import AddAddress from '@/views/AddAddress.vue';
import Addresses from '@/views/Addresses.vue';

const routes = [
  { path: '/', component: AddAddress },
  { path: '/addresses', component: Addresses },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
