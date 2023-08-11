<script setup>
import Logo from "./Logo.vue";
import Link from "./Link.vue";
</script>

<template>
  <header class="py-5 px-10 sm:px-0 bg-gray-700 absolute top-0 w-full z-10">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <Logo />
      </div>

      <nav>
        <RouterLink
          class="rounded text-white font-bold pr-8"
          :to="{ name: 'products' }">
          Products
        </RouterLink>
        <RouterLink
          class="rounded text-white font-bold pr-8"
          :to="{ name: 'orders' }">
          Orders
        </RouterLink>
        <Link to="home">Go to Shop</Link>
      </nav>
    </div>
  </header>
</template>
