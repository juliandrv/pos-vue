<script setup>
import { watch, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc } from 'firebase/firestore';
import { useFirestore, useDocument } from 'vuefire';
import { useProductsStore } from '../../stores/products';
import useImage from '../../composables/useImage';

import Link from '../../components/Link.vue';

// consult on Firestore
const route = useRoute();
const router = useRouter();
const db = useFirestore();
const docRef = doc(db, 'products', route.params.id);
const product = useDocument(docRef);

const { onFileChange, url, isImageUploaded } = useImage();
const products = useProductsStore();

const formData = reactive({
  name: '',
  image: '',
  category: '',
  price: '',
  availability: '',
});

watch(product, (product) => {
  if (!product) {
    router.push({ name: 'products' });
    return;
  }
  Object.assign(formData, product);
});

const handleSubmit = async (data) => {
  try {
    await products.updateProduct(docRef, { ...data, url });
    router.push({ name: 'products' });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <Link to="products"> Go Back </Link>

  <h1 class="text-4xl my-10 font-extrabold">Edit Product</h1>

  <div class="flex justify-center bg-white shadow">
    <div class="mx-auto mt-10 p-10 w-full 2xl:w-2/4">
      <FormKit
        type="form"
        :value="formData"
        submit-label="Save Changes"
        incomplete-message="Error saving. Please check the fields"
        @submit="handleSubmit"
      >
        <FormKit
          type="text"
          label="Name"
          name="name"
          placeholder="Product Name"
          validation="required"
          v-model.trim="formData.name"
          :validation-messages="{
            required: 'Product name is required',
          }"
        />

        <FormKit
          type="select"
          label="Category"
          name="category"
          validation="required"
          v-model.number="formData.category"
          :validation-messages="{
            required: 'Product category is required',
          }"
          :options="products.categoryOptions"
        />

        <FormKit
          type="number"
          label="Price"
          name="price"
          placeholder="Product Price"
          min="1"
          validation="required"
          :validation-messages="{
            required: 'Product price is required',
          }"
          v-model.number="formData.price"
        />

        <FormKit
          type="number"
          label="Availability"
          name="availability"
          placeholder="Available Stock"
          v-model.number="formData.availability"
          min="0"
          validation="required"
          :validation-messages="{
            required: 'Avialable stock is required',
          }"
        />

        <div v-if="isImageUploaded">
          <p class="font-black">New Image:</p>
          <img :src="url" alt="New Product Image" class="w-52" />
        </div>

        <div v-else>
          <p class="font-black">Actual Image:</p>
          <img
            :src="formData.image"
            :alt="'Image of ' + formData.image"
            class="w-52"
          />
        </div>

        <FormKit
          type="file"
          label="Change Image"
          name="image"
          multiple="false"
          accept=".jpg"
          @change="onFileChange"
        />

        <!-- <FormKit type="submit">Save Changes</FormKit> -->
      </FormKit>
    </div>
  </div>
</template>
