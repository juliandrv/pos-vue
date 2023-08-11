<script setup>
import { ref, watch } from "vue";
import { useOrdersStore } from "../../stores/orders";

import DatePicker from "vue-tailwind-datepicker";
import OrdersDetails from "../../components/OrdersDetails.vue";
import { formatCurrency } from "../../helpers";

const orders = useOrdersStore();

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MMMM",
});
const ordersMessage = ref("");

watch(orders, () => {
  if (orders.isDateSelected) {
    ordersMessage.value = "Checking for orders...";

    setTimeout(() => {
      if (orders.noOrders) {
        ordersMessage.value = "No orders on this date";
      }
    }, 3000);
  }
});

const dDate = (date) => {
  return date > new Date();
};
</script>

<template>
  <h1 class="text-4xl font-black">Orders Summary</h1>

  <div class="md:flex md:items-start gap-5 mt-10">
    <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center">
      <DatePicker
        as-single
        no-input
        v-model="orders.date"
        :formatter="formatter"
        :disable-date="dDate" />
    </div>

    <div
      class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll px-5 pb-32">
      <p v-if="orders.isDateSelected" class="text-lg text-center">
        Orders on: <span class="font-black">{{ orders.date }}</span>
      </p>

      <p v-else class="text-lg text-center">Plase select a date</p>

      <div v-if="orders.ordersCollection.length" class="space-y-5">
        <p class="text-2xl">
          Total for the day:
          <span class="font-black">{{
            formatCurrency(orders.totalOrdersOfDay)
          }}</span>
        </p>

        <OrdersDetails
          v-for="order in orders.ordersCollection"
          :key="order.id"
          :order="order" />
      </div>

      <p v-else-if="ordersMessage" class="text-lg text-center">
        {{ ordersMessage }}
      </p>
    </div>
  </div>
</template>
