<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores";
const router = useRouter();

const data = reactive({
  showPassword: "password",
  form: {
    email: "",
    password: "",
  },
});

const showPass = () => {
  data.showPassword = data.showPassword === "password" ? "text" : "password";
};

const onLogin = async () => {
  const getLogin = {
    email: data.form.email,
    password: data.form.password,
  };
  await useAuthStore().postUsers(getLogin);
};
</script>
<template>
  <div class="container p-0" style="max-width: 100%">
    <div class="grid">
      <div class="box_image">
        <div style="width: 100%; height: 100vh">
          <img src="../assets/hero-login.jpg" alt="" class="image-hero" />
        </div>
      </div>
      <div class="box-daftar d-flex align-items-center justify-content-center">
        <div class="content-login">
          <form @submit.prevent="onLogin">
            <h2 class="mb-3">Masuk</h2>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email</label>
              <input
                v-model="data.form.email"
                type="text"
                placeholder="username"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Password</label
              >
              <div class="d-flex gap-2 align-items-center">
                <input
                  v-model="data.form.password"
                  :type="data.showPassword"
                  placeholder="Password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
                <div
                  @click="showPass"
                  class="show_password"
                  style="cursor: pointer"
                >
                  <i
                    v-if="data.showPassword === 'password'"
                    class="ri-eye-off-fill"
                  ></i>
                  <i v-else class="ri-eye-fill"></i>
                </div>
              </div>
            </div>
            <div class="d-grid">
              <button class="btn btn_masuk mt-2" type="submit">Masuk</button>
            </div>
            <div class="text-center mt-3">
              <p>
                belum punya akun?
                <span
                  @click="router.push('/register')"
                  class="daftar_title fw-bold"
                  role="button"
                  tabindex="0"
                  >Daftar disini</span
                >
              </p>
            </div>
          </form>
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
.daftar_title {
  color: var(--first-color);
}
.btn_masuk {
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
.show_password {
  background-color: rgb(212, 213, 214);
  color: var(--title-color);
  padding: 0.3rem;
  border-radius: 0.3rem;
}
.show_password:hover {
  background-color: rgb(161, 161, 161);
  color: var(--title-color);
}
@media screen and (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .box_image {
    display: none;
  }
}
</style>
