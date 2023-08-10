<script setup>
import { formatCurrency } from "../helpers";
import { useCartStore } from "../stores/cart";

defineProps({
  product: Object,
});

const cart = useCartStore();
</script>

<template>
  <div class="rounded bg-white shadow">
    <img
      :src="product.image"
      :alt="'Image of ' + product.name"
      class="rounded" />

    <div class="p-3 space-y-2">
      <h3 class="text-xl font-black text-gray-700">
        {{ product.name }}
      </h3>

      <div class="flex justify-between items-center">
        <p class="text-gray-500">Stock: {{ product.availability }}</p>
        <p class="text-2xl flex-1 text-center font-extrabold text-green-500">
          {{ formatCurrency(product.price) }}
        </p>
        <button type="button" @click="cart.addItem(product)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10 bg-indigo-600 rounded-full text-white hover:bg-indigo-900">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
