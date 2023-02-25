<script setup>
import { reactive } from "vue";
import { useAuthStore } from "../stores";

const inputan = reactive({
  currentPass: "",
  newPass: "",
  confirmPass: "",
});

const changepass = () => {
  const data = {
    current_password: inputan.currentPass,
    new_password: inputan.newPass,
    confirm_password: inputan.confirmPass,
  };
  useAuthStore().changepass(data);
};
</script>
<template>
  <div class="mains" id="bodi">
    <div class="content">
      <h3 class="mb-4">Ubah Password</h3>
      <form @submit.prevent="changepass">
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-2 col-form-label"
            >Password Saat ini</label
          >
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control"
              id="inputPassword"
              v-model="inputan.currentPass"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-2 col-form-label"
            >Password Baru</label
          >
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control"
              id="inputPassword"
              v-model="inputan.newPass"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-2 col-form-label"
            >Konfirmasi Password</label
          >
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control"
              id="inputPassword"
              v-model="inputan.confirmPass"
            />
          </div>
        </div>
        <button class="btn btn-selesai mt-4" type="submit">Selesai</button>
      </form>
    </div>
  </div>
</template>
<style scoped>
.btn-selesai {
  background-color: var(--first-color);
  color: #fff;
}
</style>
