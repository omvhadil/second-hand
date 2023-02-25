<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted } from "vue";
import MyCard from "../components/CardProduct.vue";
import { useWhishlistStore } from "../stores";

onMounted(() => {
  useWhishlistStore().getWislist();
});
</script>
<template>
  <section class="mains" id="bodi">
    <div v-if="useWhishlistStore().loading" class="title_loading"></div>
    <h3 v-else class="mb-4">My Wishlist</h3>
    <div v-if="useWhishlistStore().loading" class="row">
      <div v-for="item in 18" :key="item" class="col-lg-3 col-6">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else class="container_product">
      <MyCard
        v-for="item in useWhishlistStore().wishlist"
        :key="item.id"
        :image="item.Product?.image_url"
        :title="item.Product?.name"
        :price="item.Product?.base_price"
        tong
        @delData="useWhishlistStore().delWishlist(item.id)"
      />
    </div>
  </section>
</template>
<style scoped>
/* === Loading Title Wishlist === */
.title_loading {
  height: 25px;
  width: 150px;
  margin-bottom: 1rem;
  border-radius: 5px;
  animation: skeleton-loading 1s linear infinite alternate;
}
.container_product {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
.card_loading {
  display: grid;
  row-gap: 5px;
  border: 1px solid rgb(224, 224, 224);
  padding: 0.5rem;
}
.card_loading div:first-child {
  height: 150px;
}
.card_loading div {
  height: 20px;
  border-radius: 5px;
  animation: skeleton-loading 1s linear infinite alternate;
}
@media (max-width: 576px) {
  .container_product {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
}
</style>
