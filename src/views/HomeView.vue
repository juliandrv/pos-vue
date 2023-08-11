<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '../stores/products';

import MainNav from '../components/MainNav.vue';
import ProductCard from '../components/ProductCard.vue';
import ShoppingCart from '../components/ShoppingCart.vue';

const products = useProductsStore();
const { filteredProducts, noResults } = storeToRefs(products);

const message = ref('Checking for products...');

watch(noResults, () => {
  if (noResults) {
    message.value = 'No products found';
  }
});
</script>

<template>
  <MainNav />

  <div
    v-if="!noResults"
    class="container mx-auto px-10 sm:px-0 flex flex-col sm:flex-row gap-5 mt-32"
  >
    <h2 class="text-lg font-extrabold">Filters:</h2>

    <div
      class="flex items-center gap-2"
      v-for="category in products.categories"
      :key="category.id"
    >
      <input
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        type="radio"
        name="category"
        :value="category.id"
        :checked="products.selectedCategory === category.id"
        @change="products.selectedCategory = +$event.target.value"
      />
      <label class="text-gray-900" for="category">{{
        category.name
      }}</label>
    </div>
  </div>

  <main
    class="py-10 container mx-auto px-10 sm:px-0 lg:min-h-screen lg:flex lg:h-screen lg:overflow-y-hidden"
  >
    <div class="lg:w-2/3 lg:screen lg:overflow-y-scroll pb-32 pr-5">
      <p
        v-if="noResults"
        class="text-center text-3xl font-bold mt-20"
      >
        {{ message }}
      </p>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5"
      >
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>

    <aside class="lg:w-1/3 lg:screen lg:overflow-y-scroll pb-32 px-5">
      <ShoppingCart />
    </aside>
  </main>
</template>
