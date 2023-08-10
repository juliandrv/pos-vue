<script setup>
import { useProductsStore } from '../../stores/products';
import Link from '../../components/Link.vue';
import Product from '../../components/Product.vue';

const productsStore = useProductsStore();
</script>

<template>
  <Link to="new-product">New Product</Link>

  <h1 class="text-4xl font-black my-10">Products</h1>

  <p v-if="productsStore.noResults" class="text-red-500">
    No results found
  </p>

  <ul
    v-else
    role="list"
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 2xl:grid-cols-3 gap-5"
  >
    <Product
      v-for="product in productsStore.productsCollection"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>
