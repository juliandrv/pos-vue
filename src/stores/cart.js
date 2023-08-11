import { ref, computed, watchEffect } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
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

    taxes.value = subtotal.value * TAX_RATE;

    total.value = subtotal.value + taxes.value;
  });

  function addItem(product) {
    const index = isProductInCart(product.id);
    if (index >= 0) {
      if (isProductAvailable(product, index)) {
        alert('Product is not available');
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
      product.availability < MAX_PRODUCTS
        ? product.availability
        : MAX_PRODUCTS;
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
  };
});
