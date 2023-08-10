import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const MAX_PRODUCTS = 5;

  const items = ref([]);

  function addItem(product) {
    items.value.push({ ...product, quantity: 1, id: product.id });
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
  }

  const isCartEmpty = computed(() => items.value.length === 0);

  const checkProductAvailability = computed(() => {
    return (product) =>
      product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS;
  });

  return {
    addItem,
    items,
    isCartEmpty,
    updateQuantity,
    checkProductAvailability,
  };
});
