<script setup>
import { RouterView } from "vue-router";
import AdminNav from "../../components/AdminNav.vue";
</script>

<template>
  <AdminNav />

  <div class="mt-20 py-10 px-10 sm:px-0 container mx-auto lg:min-h-screen">
    <RouterView />
  </div>
</template>
