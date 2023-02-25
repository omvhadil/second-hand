<script setup>
import { onMounted } from "vue";
import { useSellerStore } from "../../stores/index";
import MyCard from "../../components/CardProduct.vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  useSellerStore().onGetProduct();
});
</script>
<template>
  <div class="container_product">
    <div
      class="card-product add-product border rounded p-2 d-flex align-items-center justify-content-center"
    >
      <div @click="router.push('/formtambahproduct')" class="text-center">
        <i class="ri-add-circle-line"></i>
        <p>tambah product</p>
      </div>
    </div>
    <!-- ============= card product ========= -->
    <MyCard
      v-for="item in useSellerStore().allProduct"
      :key="item.id"
      @click="router.push('/detailsellerproduct/' + item.id)"
      :image="item.image_url"
      :title="item.name"
      :price="item.base_price"
      :categori="item.Categories"
    />
  </div>
</template>
<style scoped>
.card-product {
  height: 250px;
  cursor: pointer;
  overflow: hidden;
}
.add-product {
  background-color: rgb(240, 240, 240);
}
.add-product:hover {
  background-color: rgb(209, 207, 207);
}
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
