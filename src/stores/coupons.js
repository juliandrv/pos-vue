import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCouponsStore = defineStore('coupons', () => {
  const couponCode = ref('');
  const couponValidationMessage = ref('');

  const VALID_COUPONS = [
    { name: '10OFF', discount: 0.1 },
    { name: '20OFF', discount: 0.2 },
  ];

  function applyCoupon() {
    if (
      VALID_COUPONS.some((coupon) => coupon.name === couponCode.value)
    ) {
      couponValidationMessage.value = 'Applying coupon...';
      /* return VALID_COUPONS.find(
        (coupon) => coupon.name === couponCode.value
      ).discount; */
    } else {
      couponValidationMessage.value = 'Invalid Coupon';
    }

    setTimeout(() => {
      couponValidationMessage.value = '';
    }, 5000);
  }

  return {
    couponCode,
    applyCoupon,
    couponValidationMessage,
  };
});
