import { ref, computed, watchEffect, proxyRefs } from "vue";
import { defineStore } from "pinia";
import { collection, addDoc, runTransaction, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useCouponsStore } from "./coupons";
import { getCurrentDate } from "../helpers/index";

export const useCartStore = defineStore("cart", () => {
  const coupon = useCouponsStore();
  const db = useFirestore();

  const MAX_PRODUCTS = 5;
  const TAX_RATE = 0.15;

  const items = ref([]);
  const subtotal = ref(0);
  const taxes = ref(0);
  const total = ref(0);

  watchEffect(() => {
    subtotal.value = items.value.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    taxes.value = +(subtotal.value * TAX_RATE).toFixed(2);

    total.value = +(subtotal.value + taxes.value - coupon.discount).toFixed(2);
  });

  function addItem(product) {
    const index = isProductInCart(product.id);
    if (index >= 0) {
      if (isProductAvailable(product, index)) {
        alert("Product is not available");
        return;
      }
      items.value[index].quantity++;
    } else {
      items.value.push({ ...product, quantity: 1, id: product.id });
    }
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  async function checkout() {
    try {
      await addDoc(collection(db, "orders"), {
        items: items.value.map((item) => {
          const { availability, category, ...data } = item;
          return data;
        }),
        subtotal: subtotal.value,
        taxes: taxes.value,
        discount: coupon.discount,
        total: total.value,
        date: getCurrentDate(),
      });

      // Update availability from stock
      items.value.forEach(async (item) => {
        const productRef = doc(db, "products", item.id);
        await runTransaction(db, async (transaction) => {
          const currentProduct = await transaction.get(productRef);
          const availability =
            currentProduct.data().availability - item.quantity;
          transaction.update(productRef, { availability: availability });
        });
      });

      // Reset State
      $reset();
      coupon.$reset();
    } catch (error) {
      console.log(error);
    }
  }

  function $reset() {
    items.value = [];
    subtotal.value = 0;
    taxes.value = 0;
    total.value = 0;
  }

  const isProductInCart = (id) =>
    items.value.findIndex((item) => item.id === id);

  const isProductAvailable = (product, index) => {
    return (
      items.value[index].quantity >= product.availability ||
      items.value[index].quantity >= MAX_PRODUCTS
    );
  };
  const isCartEmpty = computed(() => items.value.length === 0);

  const checkProductAvailability = computed(() => {
    return (product) =>
      product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS;
  });

  return {
    addItem,
    items,
    subtotal,
    taxes,
    total,
    isCartEmpty,
    updateQuantity,
    removeItem,
    checkProductAvailability,
    checkout,
  };
});
