<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore, useBuyerStore, useWhishlistStore } from "../stores";
import Modal from "../components/ModalVue.vue";
import Swal from "sweetalert2";

const idProduct = useRoute().params.id;
const form = ref();
const showModal = ref();
const defaultAvatar = `https://ui-avatars.com/api/?name=${
  useAuthStore().productId.User?.full_name
}`;

const postWishlists = () => {
  useWhishlistStore()
    .postWishlist(idProduct)
    .then(() => {
      useAuthStore().getProductId(idProduct);
      useWhishlistStore().getWislist();
      const Toast = Swal.mixin({
        toast: true,
        position: "center-top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Wishlis Berhasil ditambahkan",
      });
    });
};
const isWislist = computed(() => {
  return useWhishlistStore().wishlist.find((e) => {
    return e.product_id == idProduct;
  });
});
const delWishlist = () => {
  useWhishlistStore()
    .delWishlist(isWislist.value.id)
    .then(() => {
      useAuthStore().getProductId(idProduct);
      useWhishlistStore().getWislist();
      const Toast = Swal.mixin({
        toast: true,
        position: "center-top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Wishlis Berhasil dihapus",
      });
    });
};
const postTawaran = () => {
  useBuyerStore()
    .PostBuyerOrder(form.value, idProduct)
    .then(() => {
      showModal.value = false;
    });
};
const isOrdered = computed(() => {
  return useBuyerStore().orderBuyer.find((e) => {
    return e.product_id == idProduct;
  });
});
onMounted(() => {
  useAuthStore().getProductId(idProduct);
  useWhishlistStore().getWislist();
  useBuyerStore().getBuyerOrder();
});
</script>
<template>
  <section id="bodi" class="mains">
    <div class="row">
      <div class="col-lg-8">
        <div class="content-img w-100 overflow-hidden border rounded-3">
          <img :src="useAuthStore().productId.image_url" />
        </div>
      </div>
      <div class="col-lg-4 mt-3 position-relative">
        <div class="border rounded p-3">
          <h3>{{ useAuthStore().productId.name }}</h3>
          <span
            v-for="item in useAuthStore().productId.Category"
            :key="item.id"
            >{{ item.name }}</span
          >
          <h5 class="mt-2">{{ useAuthStore().productId.base_price }}</h5>
          <div v-if="!isOrdered" class="d-grid gap-2 mt-4">
            <button
              type="button"
              class="btn btn-tertarik"
              @click="showModal = true"
            >
              Saya tertarik dan ingin nego
            </button>
          </div>
          <div v-if="isWislist" @click="delWishlist" class="icon_whislis">
            <i class="ri-heart-fill icon_whislis-active"></i>
          </div>
          <div v-else @click="postWishlists" class="icon_whislis">
            <i class="ri-heart-fill"></i>
          </div>
        </div>
        <div class="d-flex p-2 mt-3 rounded-3 border">
          <div class="penjual_image overflow-hidden rounded-3 me-2">
            <img
              :src="useAuthStore().productId.User?.image_url ?? defaultAvatar"
              alt=""
            />
          </div>
          <div class="penjual">
            <h5 class="m-0">
              {{ useAuthStore().productId.User?.full_name }}
            </h5>
            <p class="m-0">
              {{ useAuthStore().productId.User?.city ?? "-" }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-8 mt-3">
        <div class="border p-3 rounded-3">
          <h5>Description</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            nulla ducimus ea, officia deserunt maxime culpa, omnis quod numquam
            quibusdam saepe sed laborum assumenda nobis repudiandae ab
            cupiditate obcaecati expedita?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            nulla ducimus ea, officia deserunt maxime culpa, omnis quod numquam
            quibusdam saepe sed laborum assumenda nobis repudiandae ab
            cupiditate obcaecati expedita?
          </p>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <Teleport to="body">
      <Modal :show="showModal" @close="showModal = false">
        <template #body>
          <h6>Masukkan Harga Tawaranmu</h6>
          <p>
            Harga tawaranmu akan diketahui penual, jika penjual cocok kamu akan
            segera dihubungi penjual.
          </p>
          <div class="d-flex border p-2 rounded-3">
            <div
              class="modal_img_product overflow-hidden me-2 rounded-3 border"
            >
              <img :src="useAuthStore().productId.image_url" />
            </div>
            <div>
              <h6 class="m-0">
                {{ useAuthStore().productId.name }}
              </h6>
              <p class="m-0">Rp. {{ useAuthStore().productId.base_price }}</p>
            </div>
          </div>
          <form @submit.prevent="postTawaran">
            <div class="form_tawar">
              <h5 class="m-0">Ditawar</h5>
              <input v-model="form" type="text" />
            </div>
            <div>
              <button class="btn_kirim">Kirim</button>
            </div>
          </form>
        </template>
      </Modal>
    </Teleport>
  </section>
</template>
<style scoped>
/* ============= */
.content-img {
  height: 600px;
}
.btn-tertarik {
  background-color: var(--first-color);
  color: #fff;
}
/* ===== Whislist ===== */
.icon_whislis {
  position: absolute;
  cursor: pointer;
  top: 0.7rem;
  right: 1.8rem;
  font-size: 1.5rem;
  color: rgb(165, 164, 164);
}
.icon_whislis-active {
  color: red;
}
.penjual_image {
  width: 50px;
  height: 50px;
}
/* === Modal ===*/
.modal_img_product {
  width: 50px;
  height: 50px;
}
.form_tawar {
  margin-top: 0.7rem;
}
.form_tawar input {
  width: 100%;
  padding: 0.3rem 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  outline: none;
  margin-top: 0.3rem;
}
.btn_kirim {
  width: 100%;
  border: none;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: var(--first-color);
  color: var(--text-color-light);
  border-radius: 1rem;
}
.btn_kirim:hover {
  background-color: var(--first-color-alt);
}
@media (max-width: 576px) {
  .content-img {
    height: 300px;
  }
}
</style>
