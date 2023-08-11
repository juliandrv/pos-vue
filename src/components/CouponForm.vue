<script setup>
import { useCouponsStore } from "../stores/coupons";

const coupon = useCouponsStore();
</script>

<template>
  <p class="mt-5 py-5 font-bold border-t border-gray-200">Have a Coupon?</p>

  <div class="flex">
    <input
      class="p-2 bg-white border-gray-300 w-full"
      type="text"
      placeholder="Enter a coupon code"
      v-model="coupon.couponCode" />

    <button
      class="p-3 bg-green-400 font-bold disabled:opacity-30"
      type="button"
      @click="coupon.applyCoupon()"
      :disabled="coupon.isValidCoupon">
      Redeem
    </button>
  </div>
  <p class="text-sm font-bold mt-2">
    {{ coupon.couponValidationMessage }}
  </p>
</template>
