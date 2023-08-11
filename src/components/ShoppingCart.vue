<script setup>
import { useCartStore } from "../stores/cart";
import { useCouponsStore } from "../stores/coupons";
import { formatCurrency } from "../helpers";

import ShoppingCartItem from "./ShoppingCartItem.vue";
import ShoppingCartAmount from "./ShoppingCartAmount.vue";
import CouponForm from "./CouponForm.vue";

const cart = useCartStore();
const coupon = useCouponsStore();
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

    <dl
      class="space-y-1 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
      <ShoppingCartAmount>
        <template #label> Subtotal: </template>
        {{ formatCurrency(cart.subtotal) }}
      </ShoppingCartAmount>

      <ShoppingCartAmount>
        <template #label> Taxes: </template>
        {{ formatCurrency(cart.taxes) }}
      </ShoppingCartAmount>

      <ShoppingCartAmount v-if="coupon.isValidCoupon">
        <template #label> Discount: </template>
        {{ formatCurrency(coupon.discount) }}
      </ShoppingCartAmount>

      <ShoppingCartAmount>
        <template #label> Total: </template>
        <span class="font-bold">{{ formatCurrency(cart.total) }}</span>
      </ShoppingCartAmount>
    </dl>

    <CouponForm />

    <button
      type="button"
      class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3 rounded"
      @click="cart.checkout">
      Confirm
    </button>
  </div>
</template>
