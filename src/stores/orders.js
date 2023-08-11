import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { query, collection, where } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";

export const useOrdersStore = defineStore("orders", () => {
  const db = useFirestore();

  const date = ref("");

  const orderSource = computed(() => {
    if (date.value) {
      const q = query(
        collection(db, "orders"),
        where("date", "==", date.value)
      );
      return q;
    }
  });

  const ordersCollection = useCollection(orderSource);

  const isDateSelected = computed(() => date.value);

  const noOrders = computed(() => !ordersCollection.length && date.value);

  const totalOrdersOfDay = computed(() => {
    return ordersCollection.value
      ? ordersCollection.value.reduce((total, order) => total + order.total, 0)
      : 0;
  });

  return {
    date,
    isDateSelected,
    ordersCollection,
    noOrders,
    totalOrdersOfDay,
  };
});
