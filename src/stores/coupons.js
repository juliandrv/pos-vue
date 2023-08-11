import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";

export const useCouponsStore = defineStore("coupons", () => {
  const cart = useCartStore();

  const couponCode = ref("");
  const couponValidationMessage = ref("");
  const discountPercentage = ref(0);
  const discount = ref(0);

  const VALID_COUPONS = [
    { name: "10OFF", discount: 0.1 },
    { name: "20OFF", discount: 0.2 },
  ];

  watch(discountPercentage, () => {
    discount.value = (cart.total * discountPercentage.value).toFixed(2);
  });

  function applyCoupon() {
    if (VALID_COUPONS.some((coupon) => coupon.name === couponCode.value)) {
      couponValidationMessage.value = "Applying coupon...";

      setTimeout(() => {
        discountPercentage.value = VALID_COUPONS.find(
          (coupon) => coupon.name === couponCode.value
        ).discount;
        couponValidationMessage.value = "Discount applied!";
      }, 2000);
    } else {
      couponValidationMessage.value = "Invalid Coupon";
    }

    setTimeout(() => {
      couponValidationMessage.value = "";
    }, 5000);
  }

  function $reset() {
    couponCode.value = "";
    couponValidationMessage.value = "";
    discountPercentage.value = 0;
    discount.value = 0;
  }

  const isValidCoupon = computed(() => discountPercentage.value > 0);

  return {
    couponCode,
    applyCoupon,
    discount,
    couponValidationMessage,
    isValidCoupon,
    $reset,
  };
});
