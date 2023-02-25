<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { watchEffect } from "vue";
import { useSellerStore } from "../../stores";
import MyCard from "../../components/CardProduct.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const sellerStore = useSellerStore();
watchEffect(() => {
  sellerStore.getSellerProduct();
});
</script>
<template>
  <div class="container_product">
    <MyCard
      v-for="item in sellerStore.orderProduct"
      :key="item.id"
      @click="router.push('/infopenawar/' + item.id)"
      :image="item.image_product"
      :title="item.product_name"
      :price="item.base_price"
      :nego="item.price"
      :status="item.status"
      :date="item.updatedAt"
    />
  </div>
</template>
<style scoped>
.container_product {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
@media (max-width: 576px) {
  .container_product {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
