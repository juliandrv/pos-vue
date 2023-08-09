import { computed } from "vue";
import { defineStore } from "pinia";
import { useFirestore } from "vuefire";
import { collection, addDoc } from "firebase/firestore";

export const useProductsStore = defineStore("products", () => {
  const db = useFirestore();

  const categories = [
    { id: 1, name: "Hoodies" },
    { id: 2, name: "Shoes" },
    { id: 3, name: "Glasses" },
  ];

  async function createProduct(product) {
    await addDoc(collection(db, "products"), product);
  }

  const categoryOptions = computed(() => {
    const options = [
      { label: "Select an option", value: "", attrs: { disabled: true } },
      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    ];

    return options;
  });

  return {
    createProduct,
    categoryOptions,
  };
});