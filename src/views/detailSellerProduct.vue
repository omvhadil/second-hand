<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores";

const router = useRouter();
const idSellerProduct = useRoute().params.id;

const delProduct = () => {
  useAuthStore().delProduct(idSellerProduct);
};

onMounted(() => {
  useAuthStore().getProductIdSeller(idSellerProduct);
});
</script>
<template>
  <section id="bodi" class="mains">
    <div class="wrap mt-4 grid">
      <div class="card_image">
        <img :src="useAuthStore().productSellerId.image_url" class="image" />
      </div>
      <div>
        <div class="card-detail border rounded p-3">
          <h3>{{ useAuthStore().productSellerId.name }}</h3>
          <span
            v-for="item in useAuthStore().productSellerId.Category"
            :key="item.id"
            >{{ item.name }}</span
          >
          <h5 class="mt-2">{{ useAuthStore().productSellerId.base_price }}</h5>
          <div class="d-grid gap-2 mt-4">
            <button @click="delProduct" class="btn btn-hapus" type="button">
              Hapus Product
            </button>
            <button
              @click="router.push('/formtambahproduct')"
              class="btn btn-edit"
              type="button"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="card_description mt-3 border rounded p-2">
      <h5>Description</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nulla
        ducimus ea, officia deserunt maxime culpa, omnis quod numquam quibusdam
        saepe sed laborum assumenda nobis repudiandae ab cupiditate obcaecati
        expedita?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nulla
        ducimus ea, officia deserunt maxime culpa, omnis quod numquam quibusdam
        saepe sed laborum assumenda nobis repudiandae ab cupiditate obcaecati
        expedita?
      </p>
    </div>
  </section>
</template>
<style scoped>
.wrap {
  width: 100%;
  display: grid;
  grid-template-columns: 65% auto;
  gap: 1rem;
}
.image {
  height: 100%;
  object-fit: cover;
}
.card_image {
  width: 100%;
  height: 550px;
  overflow: hidden;
  border-radius: 1rem;
}
.card-detail {
  width: 100%;
  background-color: var(--body-color);
}
.btn-edit {
  border: 1px solid var(--first-color);
  background-color: var(--first-color);
  color: #fff;
}
.btn-hapus {
  background-color: red;
  color: var(--text-color-light);
}
.card_description {
  width: 65%;
  background-color: var(--body-color);
}
@media screen and (max-width: 767px) {
  .wrap {
    grid-template-columns: 1fr;
  }
  .card-detail {
    width: 100%;
  }
  .card_image {
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 1rem;
  }
  .card_description {
    width: 100%;
  }
}
</style>
