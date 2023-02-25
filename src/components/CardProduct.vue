<script setup>
import { formatDate } from "../plugin";

defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categori: {
    type: Array,
  },
  nego: [Number],
  status: [String],
  date: [String],
  tong: [Boolean],
});
const customStatus = (status) => {
  switch (status) {
    case "pending":
      return " status_pending ";
    case "accepted":
      return " status_accepted ";
    case "declined":
      return " status_declined ";
    default:
      return " text-bg-dark ";
  }
};
</script>
<template>
  <div class="card-product rounded shadow-sm">
    <div class="product-image">
      <img :src="image" class="product-img" />
    </div>
    <div class="content">
      <h6 class="product-title m-0">{{ title }}</h6>
      <div class="box-category">
        <span
          class="text-secondary text-category"
          v-for="item in categori"
          :key="item.id"
          >{{ item.name }}</span
        >
      </div>
      <h6>Rp. {{ price }}</h6>
      <p class="m-0" v-if="nego">Ditawar : {{ nego }}</p>
      <p v-if="date">{{ formatDate(date) }}</p>
      <span :class="customStatus(status)" v-if="status">{{ status }}</span>
      <button v-if="tong" class="btn-del" @click="$emit('delData')">
        <i class="ri-delete-bin-6-line"></i>
      </button>
    </div>
  </div>
</template>
<style scoped>
.card-product {
  background-color: #fff;
  overflow: hidden;
  position: relative;
  border: 1px solid #ccc;
}
.product-image {
  width: 100%;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}
.box-category {
  font-size: var(--smaller-font-size);
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.product-title {
  font-size: var(--smaller-font-size);
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.content {
  padding: 0.3rem 0.5rem;
}
.status_pending,
.status_accepted,
.status_declined {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgb(241, 165, 0);
  padding: 0.3rem 0.5rem;
  border-radius: 1rem;
  font-weight: bold;
  color: var(--text-color-light);
}
.status_accepted {
  background-color: rgb(14, 145, 10);
}
.status_declined {
  background-color: rgb(228, 2, 2);
}
.btn-del {
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
}
.btn-del:hover {
  background-color: rgb(189, 5, 5);
}
</style>
