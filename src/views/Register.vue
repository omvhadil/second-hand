<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores";
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

const router = useRouter();
const schema = Yup.object().shape({
  nama: Yup.string()
    .required("Nama wajib di isi")
    .typeError("Nama wajib di isi"),
  email: Yup.string()
    .required("email wajib di isi")
    .typeError("email wajib di isi"),
  password: Yup.string()
    .required("password wajib di isi")
    .typeError("password wajib di isi"),
});
const users = reactive({
  fullname: "",
  email: "",
  password: "",
});

const onRegister = () => {
  useAuthStore().register(users);
};
</script>
<template>
  <div class="container p-0" style="max-width: 100%">
    <div class="grid">
      <div class="box-image">
        <div style="width: 100%; height: 100vh">
          <img src="../assets/hero-login.jpg" alt="" class="image-hero" />
        </div>
      </div>
      <div class="box-daftar">
        <div class="content-login">
          <Form
            @submit.prevent="onRegister"
            :validation-schema="schema"
            v-slot="{ errors }"
          >
            <h2 class="mb-3">Daftar</h2>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Name</label>
              <Field
                v-model="users.fullname"
                type="text"
                name="nama"
                :class="{ 'is-invalid': errors.nama }"
                class="form-control"
                placeholder="Name"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <ErrorMessage name="nama" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email</label>
              <Field
                v-model="users.email"
                type="email"
                name="email"
                :class="{ 'is-invalid': errors.email }"
                placeholder="Username"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <ErrorMessage name="email" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Password</label
              >
              <Field
                v-model="users.password"
                name="password"
                :class="{ 'is-invalid': errors.password }"
                type="password"
                placeholder="Pasword"
                class="form-control"
                id="exampleInputPassword1"
              />
              <ErrorMessage name="password" class="invalid-feedback" />
            </div>
            <div class="d-grid">
              <button class="btn btn_daftar mt-2" type="submit">Daftar</button>
            </div>
            <div class="text-center mt-3">
              <p>
                sudah punya akun?
                <span
                  @click="router.push('/login')"
                  class="login_title fw-bold"
                  role="button"
                  tabindex="0"
                  >Masuk disini</span
                >
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.image-hero {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content-login {
  width: 400px;
  padding: 1rem;
}
.container {
  overflow: hidden;
}
.login_title {
  color: var(--first-color);
}
.btn_daftar {
  background-color: var(--first-color);
  color: var(--text-color-light);
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.box-daftar {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .box-image {
    display: none;
  }
}
</style>
