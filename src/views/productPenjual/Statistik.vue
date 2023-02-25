<!-- eslint-disable vue/return-in-computed-property -->
<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { computed, onMounted } from "vue";
import ApexCharts from "vue3-apexcharts";
import { useSellerStore } from "../../stores/index";

const getAllProductCategories = computed(() => {
  let data = { temp: [], label: [], total: [] };

  useSellerStore().allProduct.map((product) => {
    product.Categories.map((category) => {
      const index = data.temp.findIndex((x) => x.id == category.id);
      if (index == -1) {
        data.temp.push({
          id: category.id,
          name: category.name,
          count: 1,
        });
        data.label.push(category.name);
        data.total.push(1);
      } else {
        data.temp[index].count += 1;
        data.total[index] += 1;
      }
    });
  });
  return data;
});

const getAllStatusProduct = computed(() => {
  let data = { temp: [], label: [], total: [] };
});
onMounted(() => {
  useSellerStore().onGetProduct();
});
</script>
<template>
  <div class="statistik">
    <h5 class=""><i class="ri-pie-chart-fill me-2"></i>Statistik Product</h5>
    <hr class="m-2" />
    <h6>Total Product: {{ useSellerStore().allProduct.length }}</h6>
    <div class="col-12 p-2 rounded-3 border mt-3">
      <h6>Statistik Product</h6>
      <ApexCharts
        v-if="useSellerStore().allProduct.length"
        type="pie"
        height="250"
        :options="{ labels: getAllProductCategories.label }"
        :series="getAllProductCategories.total"
      />
      <br />
      <div class="mt-5">
        <h6>Statistik Product</h6>
        <ApexCharts
          v-if="useSellerStore().allProduct.length"
          type="bar"
          height="250"
          :options="{
            colors: ['#111'],
            xaxis: {
              categories: getAllProductCategories.label,
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              },
            },
          }"
          :series="[
            {
              name: 'label',
              data: getAllProductCategories.total,
            },
          ]"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.statistik {
  width: 100%;
}
</style>
