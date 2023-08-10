<script setup>
import { useCartStore } from "../stores/cart";

import ShoppingCartItem from "./ShoppingCartItem.vue";

const cart = useCartStore();
</script>

<template>
  <h3 v-if="cart.isCartEmpty" class="text-2xl text-gray-900 font-bold">
    Cart is empty
  </h3>

  <div v-else>
    <h3 class="text-2xl font-bold text-gray-900">Sales summary</h3>

    <ul role="list" class="mt-6 divide-y divide-gray-300">
      <ShoppingCartItem
        v-for="item in cart.items"
        :key="item.id"
        :item="item" />
    </ul>
  </div>
</template>
