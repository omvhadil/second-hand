<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useSellerStore } from "../stores";
import { formatDate } from "../plugin";
import Modalvue from "../components/ModalVue.vue";
import Swal from "sweetalert2";

// let thisModal = ref(null);
const id = useRoute().params.id;
const showModalTerima = ref(false);
const showModalStatus = ref(false);

const onStatus = (status) => {
  const data = {
    status: status,
  };
  const text =
    status === "accepted" ? "Mau terima tawaran ini" : "Mau tolak tawaran ini";
  Swal.fire({
    title: "Kamu Yakin?",
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      useSellerStore()
        .postSellerOrder(id, data)
        .then(() => {
          useSellerStore().getPenawarProduct(id);
          if (status === "accepted") {
            showModalTerima.value = true;
          }
        });
    }
  });
};

onMounted(() => {
  useSellerStore().getPenawarProduct(id);
});
</script>
<template>
  <div id="bodi" class="mains">
    <h5 class="mb-3">productmu yang di tawar</h5>
    <!-- ===== Penawar ===== -->
    <div class="d-flex p-2 border rounded-3 mb-3">
      <div class="image_penawar rounded-3 overflow-hidden me-2">
        <img :src="useSellerStore().penawar.User?.image_url" alt="" />
      </div>
      <div class="info_penawar">
        <h5 class="m-0">
          {{ useSellerStore().penawar.User?.full_name }}
        </h5>
        <span class="m-0 font-smaller">{{
          useSellerStore().penawar.User?.city
        }}</span>
      </div>
    </div>
    <!-- ===== Product yng di tawar ===== -->
    <div class="row border p-3 rounded-3">
      <div class="col-lg-3">
        <div class="image_product border mb-3 rounded-3 overflow-hidden">
          <img :src="useSellerStore().penawar.Product?.image_url" />
        </div>
      </div>
      <div class="col-lg-9">
        <p class="d-flex m-0 justify-content-between">
          <span class="subtitle_text">Productmu yang di tawar</span>
          <span class="subtitle_date">{{
            formatDate(useSellerStore().penawar.updatedAt)
          }}</span>
        </p>
        <h5 class="detail_ditawar_name m-0">
          {{ useSellerStore().penawar.Product?.name }}
        </h5>
        <del class="detail_ditawar_price text-secondary m-0">
          Rp.
          {{ useSellerStore().penawar.base_price }}
        </del>
        <h6 class="mb-3">
          Rp.
          {{ useSellerStore().penawar.price }}
        </h6>
        <div
          v-if="useSellerStore().penawar.status === 'accepted'"
          class="d-flex gap-2"
        >
          <button class="btnku btn_status" @click="showModalStatus = true">
            status
          </button>
          <button class="btnku btn_hubungi">
            Hubungi di <i class="ri-whatsapp-line"></i>
          </button>
        </div>
        <div
          v-else-if="useSellerStore().penawar.status === 'pending'"
          class="d-flex gap-2"
        >
          <button @click="onStatus('declined')" class="btnku btn_tolak">
            Tolak
          </button>
          <button @click="onStatus('accepted')" class="btnku btn_terima">
            Terima
          </button>
        </div>
        <div v-else class="d-flex">
          <p>Anda sudah menolak tawaran ini</p>
        </div>

        <Teleport to="body">
          <Modalvue :show="showModalTerima" @close="showModalTerima = false">
            <template #body>
              <div class="">
                <h6 class="m-0 mb-2">
                  Yeay kamu berhasil mendapatkan harga yang sesuai
                </h6>
                <p>
                  Segera hubungi pembeli melalui Whatsapp untuk transaksi
                  selanjutnya
                </p>
                <div class="p-2 rounded-3" style="background-color: #ccc">
                  <h5 class="text-center text-first mb-3">Product Match</h5>
                  <div class="d-flex">
                    <div class="modal_image_pembeli rounded me-2">
                      <img :src="useSellerStore().penawar.User?.image_url" />
                    </div>
                    <div class="">
                      <h6 class="m-0">
                        {{ useSellerStore().penawar.User?.full_name }}
                      </h6>
                      <p class="m-0">
                        {{ useSellerStore().penawar.User?.city }}
                      </p>
                    </div>
                  </div>
                  <div class="d-flex mt-4">
                    <div class="modal_image_product rounded me-2">
                      <img :src="useSellerStore().penawar.Product?.image_url" />
                    </div>
                    <div class="">
                      <h6 class="m-0">
                        {{ useSellerStore().penawar.Product?.name }}
                      </h6>
                      <del class="m-0">
                        Rp. {{ useSellerStore().penawar.base_price }}
                      </del>
                      <p class="m-0">
                        Ditawar Rp. {{ useSellerStore().penawar.price }}
                      </p>
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary mt-4 ms-5">
                  Hubungi via Whatsapp
                </button>
              </div>
            </template>
          </Modalvue>
        </Teleport>
        <Teleport to="body">
          <Modalvue :show="showModalStatus" @close="showModalStatus = false">
            <template #body>
              <div class="">
                <h6 class="mb-4">Perbarui Status penjualan productmu</h6>
                <div class="">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      class="form-check-label fw-semibold"
                      for="flexRadioDefault1"
                    >
                      Berhasil terjual
                    </label>
                    <p>Kamu telah sepakat menjual produk ini kepada pembeli</p>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                    <label
                      class="form-check-label fw-semibold"
                      for="flexRadioDefault2"
                    >
                      Batalkan transaksi
                    </label>
                    <p>Kamu membatalkan transaksi produk ini dengan pembeli</p>
                  </div>
                </div>
                <button class="btn-kirim">kirim</button>
              </div>
            </template>
          </Modalvue>
        </Teleport>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* === Info penawar === */
.image_penawar {
  width: 60px;
  height: 60px;
}
/* === Info product === */
.image_product {
  height: 200px;
}
.btnku {
  padding: 0.3rem 3rem;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
}

.btn_terima,
.btn_hubungi {
  background-color: var(--first-color);
  color: var(--text-color-light);
}
.btn_status,
.btn_tolak {
  background-color: #fff;
  border: 2px solid var(--first-color);
  color: var(--first-color);
}
/* === Modal terima === */
.modal_image_pembeli,
.modal_image_product {
  width: 50px;
  height: 50px;
  overflow: hidden;
}
/* === Modal status === */
.btn-kirim {
  background-color: var(--first-color);
  color: #fff;
  width: 100%;
  border: none;
  margin-top: 2rem;
  padding: 0.5rem;
  border-radius: 1rem;
  cursor: pointer;
}
</style>
