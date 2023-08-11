<script setup>
import { formatCurrency } from "../helpers";

import ShoppingCartAmount from "./ShoppingCartAmount.vue";

defineProps({
  order: Object,
});
</script>

<template>
  <div class="border-t border-gray-300 spave-y-6 py-6">
    <h2 class="text-2xl font-black">Order Details:</h2>
    <p class="text-xl font-black text-gray-600">Products:</p>

    <ul
      role="list"
      class="mt-6 divide-y divide-gray-300 border-t border-gray-300 text-sm font-medium text-gray-500">
      <li v-for="item in order.items" :key="item.id" class="flex gap-6 py-6">
        <img
          :src="item.image"
          :alt="'Image of ' + item.name"
          class="w-32 h-32 flex-none rounded" />

        <div class="flex-auto space-y-2">
          <h3 class="text-gray-900">{{ item.name }}</h3>

          <p>{{ formatCurrency(item.price) }}</p>

          <p>Quantity: {{ item.quantity }}</p>
        </div>
      </li>
    </ul>

    <dl
      class="space-y-1 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
      <ShoppingCartAmount>
        <template #label> Subtotal: </template>
        {{ formatCurrency(order.subtotal) }}
      </ShoppingCartAmount>

      <ShoppingCartAmount>
        <template #label> Taxes: </template>
        {{ formatCurrency(order.taxes) }}
      </ShoppingCartAmount>

      <ShoppingCartAmount v-if="order.discount">
        <template #label> Discount: </template>
        {{ formatCurrency(order.discount) }}
      </ShoppingCartAmount>

      <ShoppingCartAmount>
        <template #label> Total: </template>
        <span class="font-bold">{{ formatCurrency(order.total) }}</span>
      </ShoppingCartAmount>
    </dl>
  </div>
</template>
