<script setup>
import { onMounted } from "vue";
import { useBuyerStore } from "../stores";

const kondisiStatus = (statuss) => {
  switch (statuss) {
    case "pending":
      return " statuss_pending ";
    case "accepted":
      return " statuss_accepted ";
    case "declined":
      return " statuss_declined ";
    case "seller":
      return " statuss_seller ";
    default:
      return " text-bg-dark ";
  }
};

onMounted(() => {
  useBuyerStore().getBuyerOrder();
});
</script>
<template>
  <div id="bodi" class="mains">
    <div class="container_product">
      <div
        v-for="item in useBuyerStore().orderBuyer"
        :key="item.id"
        class="card_product"
      >
        <div class="image_product">
          <img :src="item.image_product" alt="" />
        </div>
        <div class="detail_product">
          <h3 class="product_title m-0">{{ item.product_name }}</h3>
          <del class="product_price m-0">Rp. {{ item.base_price }}</del>
          <p class="product_lokasi m-0">
            {{ item.Product?.location }}
          </p>
          <h5 class="product_bit_price mm-0">Ditawar : Rp {{ item.price }}</h5>
        </div>
        <div class="content_status">
          <p class="m-0" :class="kondisiStatus(item.status)" v-if="item.status">
            {{ item.status }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container_product {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
.card_product {
  border: 1px solid #ccc;
  padding: 0.5rem;
  display: flex;
  column-gap: 1rem;
  background-color: #fff;
}
.detail_product {
  width: 100%;
}
.image_product {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product_title,
.product_price,
.product_bit_price {
  font-size: 1rem;
}
.statuss_accepted,
.statuss_pending,
.statuss_declined,
.statuss_seller {
  background-color: rgb(99, 69, 13);
  padding: 0.2rem 0.7rem;
  color: #fff;
  border-radius: 1rem;
}
.statuss_accepted {
  background-color: rgb(19, 163, 6);
}
.statuss_declined {
  background-color: rgb(233, 24, 17);
}
.statuss_seller {
  background-color: rgb(39, 17, 233);
}
.content_status {
  display: block;
  display: flex;
  align-items: center;
}
</style>
