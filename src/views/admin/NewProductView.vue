<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import useImage from "../../composables/useImage";
import { useProductsStore } from "../../stores/products";

import Link from "../../components/Link.vue";

const { onFileChange, url, isImageUploaded } = useImage();

const productsStore = useProductsStore();
const router = useRouter();

const formData = reactive({
  name: "",
  image: "",
  category: "",
  price: "",
  availability: "",
});

const handleSubmit = async (data) => {
  const { image, ...values } = data;

  try {
    await productsStore.createProduct({
      ...values,
      image: url.value,
    });
    router.push({ name: "products" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <Link to="products">Go Back</Link>

  <h1 class="text-4xl font-black my-10">New Product</h1>

  <div class="flex justify-center bg-white shadow">
    <div class="mt-10 p-10 w-full 2xl:w-2/4">
      <FormKit
        type="form"
        submit-label="Add Product"
        incomplete-message="All fieds are required"
        @submit="handleSubmit"
        :value="formData">
        <FormKit
          type="text"
          label="Name"
          name="name"
          placeholder="Product Name"
          validation="required"
          :validation-messages="{ required: 'Product name is required' }"
          v-model.trim="formData.name" />

        <FormKit
          type="file"
          label="Image"
          name="image"
          validation="required"
          :validation-messages="{ required: 'Product image is required' }"
          accept=".jpg"
          @change="onFileChange"
          v-model.trim="formData.image" />

        <div v-if="isImageUploaded">
          <p class="font-black">Product Image:</p>
          <img :src="url" alt="New Product Image" class="w-60" />
        </div>

        <FormKit
          type="select"
          label="Category"
          name="category"
          validation="required"
          :validation-messages="{ required: 'Product category is required' }"
          :options="productsStore.categoryOptions"
          v-model.number="formData.category" />

        <FormKit
          type="number"
          label="Price"
          name="price"
          placeholder="Product Price"
          validation="required"
          :validation-messages="{ required: 'Product price is required' }"
          min="1"
          v-model.number="formData.price" />

        <FormKit
          type="number"
          label="Availability"
          name="availability"
          placeholder="Available Stock"
          validation="required"
          :validation-messages="{
            required: 'Avialable stock is required',
          }"
          min="1"
          v-model.number="formData.availability" />
      </FormKit>
    </div>
  </div>
</template>
