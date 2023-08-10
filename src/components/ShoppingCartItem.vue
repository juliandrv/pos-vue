<script setup>
import { formatCurrency } from "../helpers/index";
import { useCartStore } from "../stores/cart";

defineProps({
  item: Object,
});

const cart = useCartStore();
</script>

<template>
  <li class="flex space-x-6 py-6">
    <img
      :src="item.image"
      :alt="'Image of ' + item.name"
      class="w-24 h-24 cover rounded flex-none" />

    <div class="flex-auto space-y-2">
      <h3 class="text-gray-900">{{ item.name }}</h3>
      <p class="font-bold">{{ formatCurrency(item.price) }}</p>

      <select
        class="text-center rounded bg-white"
        @change="cart.updateQuantity(item.id, +$event.target.value)">
        <option v-for="n in cart.checkProductAvailability(item)" :value="n">
          {{ n }}
        </option>
      </select>
    </div>
  </li>
</template>
