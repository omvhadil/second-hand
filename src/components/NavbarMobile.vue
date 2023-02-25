<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <nav
    class="nav_mobile position-fixed bottom-0 start-0 bg-white w-100 p-4 pt-3 pb-3"
  >
    <div class="row">
      <div class="col-1"></div>
      <div class="col-2">
        <RouterLink
          to="/"
          exact-active-class="actived"
          v-slot="{ isExactActive }"
        >
          <i
            :class="
              isExactActive ? 'icon ri-home-7-fill' : 'icon ri-home-7-line'
            "
          ></i>
        </RouterLink>
      </div>
      <div class="col-2">
        <RouterLink to="/tokosaya" active-class="actived" v-slot="{ isActive }">
          <i
            :class="isActive ? 'icon ri-store-2-fill' : 'icon ri-store-2-line'"
          ></i>
        </RouterLink>
      </div>
      <div class="col-2">
        <RouterLink
          to="/formtambahproduct"
          exact-active-class="actived"
          v-slot="{ isExactActive }"
        >
          <i
            :class="
              isExactActive
                ? 'icon ri-add-circle-fill'
                : 'icon ri-add-circle-line'
            "
          ></i>
        </RouterLink>
      </div>
      <div class="col-2">
        <RouterLink
          to="/notification"
          exact-active-class="actived"
          v-slot="{ isExactActive }"
        >
          <i
            :class="
              isExactActive
                ? 'icon ri-notification-2-fill'
                : 'icon ri-notification-2-line'
            "
          ></i>
        </RouterLink>
      </div>
      <div class="col-2">
        <RouterLink
          to="/usermobile"
          exact-active-class="actived"
          v-slot="{ isExactActive }"
        >
          <i
            :class="
              isExactActive ? 'icon ri-user-3-fill' : 'icon ri-user-3-line'
            "
          ></i>
        </RouterLink>
      </div>
      <div class="col-1"></div>
    </div>
  </nav>
</template>
<style scoped>
.nav_mobile {
  z-index: 99;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.1);
  display: none;
}
.icon {
  font-size: 1.3rem;
}
a {
  color: #000;
}
.actived {
  color: var(--first-color) !important;
}
@media (max-width: 576px) {
  .nav_mobile {
    display: block;
  }
}
</style>
