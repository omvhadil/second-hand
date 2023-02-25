<script setup>
import { useAuthStore } from "@/stores";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  useAuthStore().getUser();
});
</script>
<template>
  <div id="bodi" class="mains">
    <h5>Toko Saya</h5>
    <!-- ===== info penjual ===== -->
    <div class="card-profile">
      <div class="col-profile">
        <div class="card-image me-2" style="width: 50px; height: 50px">
          <img
            :src="useAuthStore().userId.image_url"
            class="rounded me-3 img-profile"
          />
        </div>
        <div>
          <h5 class="m-0">{{ useAuthStore().userId.full_name }}</h5>
          <span style="color: #aaa">{{ useAuthStore().userId.city }}</span>
        </div>
      </div>
      <div class="col_btn">
        <button @click="router.push('/profilesaya')" class="btn-detail-profile">
          Detail
        </button>
      </div>
    </div>
    <div class="container_product_saya gap-3" style="width: 100%">
      <!-- ==== Toko saya ==== -->
      <div>
        <div class="col-kategori border rounded">
          <h6>Toko saya</h6>
          <div class="mt-2">
            <RouterLink
              exact-active-class="actived"
              to="/tokosaya"
              class="cursor d-flex gap-2 text-dark pt-2 pb-2 text-success cursor-pointer"
              v-slot="{ isExactActive }"
              ><i
                :class="isExactActive ? 'ri-store-2-fill' : 'ri-store-2-line'"
              ></i>
              <p class="m-0">Semua Product</p></RouterLink
            >
            <hr />
            <RouterLink
              exact-active-class="actived"
              to="/tokosaya/diminati"
              class="cursor d-flex gap-2 text-dark pt-2 pb-2 text-success cursor-pointer"
              v-slot="{ isExactActive }"
              ><i
                :class="isExactActive ? 'ri-service-fill' : 'ri-service-line'"
              ></i>
              <p class="m-0">Dimanati</p></RouterLink
            >
            <hr />
            <RouterLink
              exact-active-class="actived"
              to="/tokosaya/terjual"
              class="cursor d-flex gap-2 text-dark pt-2 pb-2 text-success cursor-pointer"
              v-slot="{ isExactActive }"
              ><i
                :class="
                  isExactActive
                    ? 'ri-creative-commons-nc-fill'
                    : 'ri-creative-commons-nc-line'
                "
              ></i>
              <p class="m-0">Terjual</p></RouterLink
            >
            <hr />
            <RouterLink
              exact-active-class="actived"
              to="/statistik"
              class="cursor d-flex gap-2 text-dark pt-2 pb-2 text-success cursor-pointer"
              v-slot="{ isExactActive }"
              ><i
                :class="
                  isExactActive ? 'ri-pie-chart-fill' : 'ri-pie-chart-line'
                "
              ></i>
              <p class="m-0">Statistik</p></RouterLink
            >
          </div>
        </div>
      </div>
      <!-- ==== container Product ==== -->
      <div>
        <div class="content-product">
          <!-- ========== card tambah product ============== -->
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.cursor {
  cursor: pointer;
}
hr {
  margin: 0;
}
.mains h5 {
  font-size: var(--h3-font-size);
  margin-bottom: var(--mb-1);
}
/* === Profile === */
.card-profile {
  background-color: var(--body-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
}
.col-profile {
  display: flex;
  column-gap: 1rem;
}
.img-profile {
  height: 100%;
  object-fit: cover;
}
.btn-detail-profile {
  border: 1px solid var(--first-color);
  background-color: #fff;
  padding: 0.3rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  color: var(--first-color);
}
/* === Toko Saya === */
.container_product_saya {
  display: grid;
  grid-template-columns: 300px auto;
  column-gap: 1rem;
  margin-top: 1rem;
}
.col-kategori {
  padding: 1rem;
  background-color: var(--body-color);
}
.actived {
  color: var(--first-color) !important;
  font-weight: 600;
}
.col-products {
  width: 100%;
  padding: 1rem;
  background-color: var(--body-color);
}
/* === Product Saya === */
.content-product {
  width: 100%;
  padding: 0.5rem;
  background-color: var(--body-color);
  border-top: 1px solid var(--border-color);
}
@media screen and (max-width: 767px) {
  .container_product_saya {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr;
  }
  .col-kategori {
    width: 100%;
  }
  .content-product {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
