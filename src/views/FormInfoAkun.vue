<script setup>
import { reactive } from "vue";
import MyInput from "../components/MyInput.vue";
import { useAuthStore } from "../stores";

const data = reactive({
  form: {
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    city: "",
    image: "",
    preview: "",
  },
});

const putUser = () => {
  const formData = new FormData();
  formData.append("full_name", data.form.fullname);
  formData.append("email", data.form.email);
  formData.append("password", data.form.password);
  formData.append("phone_number", data.form.phoneNumber);
  formData.append("address", data.form.address);
  formData.append("city", data.form.city);
  formData.append("image", data.form.image);
  useAuthStore().putUser(formData);
};

const setFile = (e) => {
  data.form.image = e.target.files[0];
  data.form.preview = URL.createObjectURL(data.form.image);
};
</script>
<template>
  <div class="container section">
    <div class="wrap ms-auto me-auto mt-5 pb-5">
      <form @submit.prevent="putUser">
        <div
          v-if="data.form.image"
          class="card-image-profile curpoin d-flex align-items-center justify-content-center"
        >
          <img :src="data.form.preview" alt="" />
        </div>
        <div
          v-else
          class="card-image-profile curpoin d-flex align-items-center justify-content-center"
        >
          <i class="ri-camera-line" style="font-size: 2rem"></i>
          <input @input="setFile" type="file" />
        </div>

        <MyInput v-model="data.form.fullname" title="full nama" type="text" />
        <MyInput v-model="data.form.email" title="Email" type="email" />
        <MyInput
          v-model="data.form.phoneNumber"
          title="phone number"
          type="number"
        />
        <MyInput v-model="data.form.address" title="address" type="text" />
        <MyInput v-model="data.form.city" title="city" type="text" />
        <div class="d-grid mt-4">
          <button class="btn btn_simpan" type="submit">Simpan</button>
        </div>
      </form>
      <!-- ============== Button simpan ========= -->
    </div>
  </div>
</template>
<style scoped>
.container {
  margin-top: 6rem;
}
.wrap {
  width: 500px;
}
.card-image-profile {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--first-color-light);
  color: var(--text-color-light);
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.card-image-profile input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.btn_simpan {
  background-color: var(--first-color);
  color: var(--text-color-light);
}
</style>
