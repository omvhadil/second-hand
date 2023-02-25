<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="mains" id="bodi">
    <!-- ==== Profile === -->
    <div class="row">
      <div class="col-3">
        <div class="content-image rounded-circle overflow-hidden">
          <img src="../assets/prof.jpg" alt="" />
        </div>
      </div>
      <div class="col-9">
        <div class="content-profile">
          <h5 class="m-0">Alabim</h5>
          <span class="font-smaller">alamat profile</span>
        </div>
      </div>
    </div>
    <hr />
    <div class="menu-ut">
      <h5 class="mb-3">Menu Utama</h5>
      <RouterLink to="/profilesaya">
        <div class="d-flex gap-2 mb-3 cursor">
          <i class="ri-user-3-line"></i><span>Profile Saya</span>
        </div>
      </RouterLink>
      <RouterLink to="/wishlist">
        <div class="d-flex gap-2 mb-3 cursor">
          <i class="ri-heart-3-line"></i><span>Wishlist</span>
        </div>
      </RouterLink>
      <RouterLink to="/tawaransaya">
        <div class="d-flex gap-2 mb-3 cursor">
          <i class="ri-suitcase-2-line"></i><span>Tawaran Saya</span>
        </div>
      </RouterLink>
      <div class="d-flex gap-2 mb-3 cursor">
        <i class="ri-logout-box-line"></i><span>Log Out</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content-image {
  width: 60px;
  height: 60px;
}
a {
  color: #000;
}
</style>
