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
    <div class="row">
      <div class="col-lg-4">
        <div class="profile_image overflow-hidden rounded-3 border">
          <img :src="useAuthStore().userId.image_url" />
        </div>
        <div class="d-grid gap-3">
          <button @click="router.push('/forminfoakun')" class="btn btn-primary">
            Ubah Biodata
          </button>
          <button
            @click="router.push('/changepassword')"
            class="btn btn-secondary"
          >
            Ubah Password
          </button>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="p-4">
          <h3 class="mb-3">Ubah biodatamu</h3>
          <div class="d-flex mb-3">
            <p class="profile_title m-0">Name</p>
            <span class="me-4">{{ useAuthStore().userId.full_name }}</span>
          </div>
          <div class="d-flex mb-3">
            <p class="profile_title m-0">Alamat</p>
            <span class="me-4">{{ useAuthStore().userId.address }}</span>
          </div>
          <div class="d-flex mb-3">
            <p class="profile_title m-0">Kota</p>
            <span class="me-4">{{ useAuthStore().userId.city }}</span>
          </div>
          <div class="d-flex mb-3">
            <p class="profile_title m-0">Nomor Hp</p>
            <span class="me-4">{{ useAuthStore().userId.phone_number }}</span>
          </div>
          <div class="d-flex mb-3">
            <p class="profile_title m-0">Email</p>
            <span class="me-4">{{ useAuthStore().userId.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* === Image-  profile === */
.profile_image {
  width: 100%;
  height: 300px;
}
.profile_title {
  width: 150px;
}
@media (max-width: 576px) {
  .profile_title {
    width: 120px;
  }
}
</style>
